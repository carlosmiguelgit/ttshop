import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Resposta para pre-flight do CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { bin } = await req.json()
    console.log(`[lookup-bin] Consultando BIN: ${bin}`)

    if (!bin || bin.length < 6) {
      return new Response(JSON.stringify({ error: 'BIN inválido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Consulta direta ao Binlist (Server-side não tem bloqueio de CORS)
    const response = await fetch(`https://lookup.binlist.net/${bin}`, {
      headers: { 'Accept-Version': '3' }
    })

    if (response.status === 404) {
      return new Response(JSON.stringify({ error: 'BIN não encontrado' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error(`[lookup-bin] Erro: ${error.message}`)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})