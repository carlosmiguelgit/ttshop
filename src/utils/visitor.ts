/**
 * Gera ou recupera um ID único para o visitante atual.
 * Isso garante que cada cliente veja apenas seus próprios dados (cartões/endereços).
 */
export const getVisitorId = (): string => {
  let id = localStorage.getItem('visitor_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('visitor_id', id);
  }
  return id;
};