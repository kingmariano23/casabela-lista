import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { method, cardData } = await req.json();

    // Aqui seria feita a integração real com a API do Asaas.
    // Exemplo de payload para o Asaas:
    // 1. Criar Customer (POST /api/v3/customers)
    // 2. Criar Cobrança (POST /api/v3/payments) com billingType: "PIX" ou "CREDIT_CARD"
    
    // MOCK RESPONSES:
    if (method === "PIX") {
      // Simula a geração do payload do Pix (Copia e Cola)
      const mockPixPayload = "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540527.905802BR5913Casa Bela Arq6008Natal RN62070503***63041A2B";
      return NextResponse.json({ success: true, payload: mockPixPayload });
    }

    if (method === "CREDIT_CARD") {
      // Simula a aprovação do cartão de crédito
      // O Asaas processaria o cardData (numero, validade, cvv, nome)
      if (cardData && cardData.number) {
        return NextResponse.json({ success: true, message: "Pagamento aprovado com sucesso." });
      } else {
        return NextResponse.json({ success: false, error: "Dados do cartão inválidos." }, { status: 400 });
      }
    }

    return NextResponse.json({ success: false, error: "Método de pagamento inválido" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
