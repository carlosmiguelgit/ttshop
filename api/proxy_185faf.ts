import type { VercelRequest, VercelResponse } from '@vercel/node';

// PARADISE CHECKOUT - POPUP PROXY V4.9 (Reescrito para Vercel Serverless Function)

// Configurações fixas do seu script PHP
const API_TOKEN = 'sk_4e3c25826cf4ddfbf5e5a0b8807e74a73f8199d597b5d95dabe358a2f8fef7d2';
const PRODUCT_HASH = 'prod_9c3a56f4a6e0753c';
const BASE_AMOUNT = 7990;
const PRODUCT_TITLE = 'Smart TV TCL 55P7K 55" QLED 4K UHD Google TV';
const API_URL = 'https://multi.paradisepags.com/api/v1/transaction.php';

// Dados de preenchimento falso (simulando a lógica PHP)
const cpfs = ['42879052882', '07435993492', '93509642791', '73269352468', '35583648805', '59535423720', '77949412453', '13478710634', '09669560950', '03270618638'];
const firstNames = ['João', 'Marcos', 'Pedro', 'Lucas', 'Mateus', 'Gabriel', 'Daniel', 'Bruno', 'Maria', 'Ana', 'Juliana', 'Camila', 'Beatriz', 'Larissa', 'Sofia', 'Laura'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho'];
const ddds = ['11', '21', '31', '41', '51', '61', '71', '81', '85', '92', '27', '48'];
const emailProviders = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com.br', 'uol.com.br', 'terra.com.br'];

const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '');

function generateFakeData(customerData: any, isDirectPix: boolean) {
    let generatedName = null;
    
    if (!customerData.name && (isDirectPix || !true)) { // !true simula o campo 'name' desabilitado no CHECKOUT JSON
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        generatedName = `${randomFirstName} ${randomLastName}`;
        customerData.name = generatedName;
    }

    if (!customerData.email && (isDirectPix || !true)) { // !true simula o campo 'email' desabilitado
        const nameForEmail = generatedName || customerData.name || `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        const nameParts = nameForEmail.split(' ', 2);
        
        const emailUserParts = [];
        if (nameParts[0]) { 
            const part1 = normalize(nameParts[0]); 
            if (part1.length > 0) emailUserParts.push(part1); 
        }
        if (nameParts[1]) { 
            const part2 = normalize(nameParts[1]); 
            if (part2.length > 0) emailUserParts.push(part2); 
        }
    
        if (emailUserParts.length === 0) { emailUserParts.push('cliente'); }
    
        const emailUser = emailUserParts.join('.') + Math.floor(Math.random() * 900 + 100);
        customerData.email = `${emailUser}@${emailProviders[Math.floor(Math.random() * emailProviders.length)]}`;
    }

    if (!customerData.phone_number) {
        customerData.phone_number = `${ddds[Math.floor(Math.random() * ddds.length)]}9${Math.floor(10000000 + Math.random() * 90000000)}`;
    }

    if (!customerData.document && (isDirectPix || !false)) { // !false simula o campo 'document' desabilitado
        customerData.document = cpfs[Math.floor(Math.random() * cpfs.length)];
    }
    
    return customerData;
}

function cleanData(data: string | undefined) {
    return data ? data.replace(/\D/g, '') : '';
}

export default async function (req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        // O PHP original só aceita POST, então mantemos isso.
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const data = req.body;
    let customerData = data.customer || {};
    const utms = data.utms || {};
    const checkoutUrl = data.checkoutUrl || '';
    
    // Simulação da lógica de preenchimento de dados falsos
    const isDirectPix = false; // Baseado no CHECKOUT JSON do frontend
    customerData = generateFakeData(customerData, isDirectPix);

    const reference = 'POP-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    const cleanDocument = cleanData(customerData.document);
    const cleanPhone = cleanData(customerData.phone_number);

    const payload: any = {
        amount: BASE_AMOUNT,
        description: PRODUCT_TITLE,
        reference: reference,
        checkoutUrl: checkoutUrl,
        productHash: PRODUCT_HASH,
        customer: {
            name: customerData.name || 'N/A',
            email: customerData.email || 'na@na.com',
            document: cleanDocument,
            phone: cleanPhone
        }
    };

    // Adicionar tracking
    const tracking_keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'sck', 'fbc', 'fbp'];
    const tracking: { [key: string]: string } = {};
    for (const key of tracking_keys) {
        if (utms[key]) {
            tracking[key] = utms[key];
        }
    }
    if (Object.keys(tracking).length > 0) {
        payload.tracking = tracking;
    }

    try {
        const apiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-Key': API_TOKEN
            },
            body: JSON.stringify(payload)
        });

        const responseData = await apiResponse.json();
        const httpCode = apiResponse.status;

        if (httpCode >= 200 && httpCode < 300) {
            const transactionData = responseData.transaction || responseData;

            // Reshape response for frontend compatibility
            const frontendResponse = {
                hash: transactionData.id || reference,
                pix: {
                    pix_qr_code: transactionData.qr_code || '',
                    expiration_date: transactionData.expires_at || null
                }
            };
            return res.status(httpCode).json(frontendResponse);
        } else {
            // Passa o erro da API de pagamento de volta
            return res.status(httpCode).json(responseData);
        }
    } catch (error) {
        console.error('API Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error during API call.' });
    }
}