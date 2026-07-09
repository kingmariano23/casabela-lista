"use client";

import { useState } from "react";

export default function CheckoutAsaas() {
  const [method, setMethod] = useState("PIX");
  const [loading, setLoading] = useState(false);
  const [pixPayload, setPixPayload] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fake states para o cartão (na vida real usaríamos lib de tokenização do Asaas ou enviaremos via backend com PCI Compliance básico)
  const [cardData, setCardData] = useState({
    name: "", number: "", expiry: "", cvv: "", cpfCnpj: ""
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, cardData })
      });
      const data = await res.json();
      
      if (method === "PIX") {
        // Exibe o QR Code / Copia e Cola
        setPixPayload(data.payload);
      } else {
        // Mostra sucesso
        setSuccess(true);
      }
    } catch (error) {
      alert("Houve um erro no processamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h3 style={{ fontSize: "1.5rem", color: "var(--color-petroleo)" }}>Pagamento Confirmado! 🎉</h3>
        <p style={{ marginTop: "1rem" }}>Verifique seu e-mail para baixar o E-book Premium.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "12px", padding: "2rem", border: "1px solid var(--color-areia)" }}>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button 
          type="button"
          onClick={() => setMethod("PIX")}
          style={{
            flex: 1, padding: "1rem", borderRadius: "8px", fontWeight: "bold",
            border: `2px solid ${method === "PIX" ? "var(--color-petroleo)" : "var(--color-areia)"}`,
            background: method === "PIX" ? "var(--color-creme)" : "white",
            color: "var(--color-petroleo)", cursor: "pointer"
          }}
        >
          PIX
        </button>
        <button 
          type="button"
          onClick={() => setMethod("CREDIT_CARD")}
          style={{
            flex: 1, padding: "1rem", borderRadius: "8px", fontWeight: "bold",
            border: `2px solid ${method === "CREDIT_CARD" ? "var(--color-petroleo)" : "var(--color-areia)"}`,
            background: method === "CREDIT_CARD" ? "var(--color-creme)" : "white",
            color: "var(--color-petroleo)", cursor: "pointer"
          }}
        >
          Cartão de Crédito
        </button>
      </div>

      <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        
        {method === "CREDIT_CARD" && (
          <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="text" className="input-field" placeholder="Número do Cartão" required
              value={cardData.number} onChange={e => setCardData({...cardData, number: e.target.value})} />
            <input type="text" className="input-field" placeholder="Nome impresso no Cartão" required
              value={cardData.name} onChange={e => setCardData({...cardData, name: e.target.value})} />
            
            <div style={{ display: "flex", gap: "1rem" }}>
              <input type="text" className="input-field" placeholder="Validade (MM/AA)" required style={{ flex: 1 }}
                value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: e.target.value})} />
              <input type="text" className="input-field" placeholder="CVV" required style={{ flex: 1 }}
                value={cardData.cvv} onChange={e => setCardData({...cardData, cvv: e.target.value})} />
            </div>

            <input type="text" className="input-field" placeholder="Seu CPF" required
              value={cardData.cpfCnpj} onChange={e => setCardData({...cardData, cpfCnpj: e.target.value})} />
          </div>
        )}

        {method === "PIX" && !pixPayload && (
          <div className="animate-fade-in" style={{ textAlign: "center", padding: "1rem" }}>
            <p>Aprovação imediata. Ao gerar, você terá 15 minutos para pagar via PIX copia e cola.</p>
          </div>
        )}

        {method === "PIX" && pixPayload ? (
          <div className="animate-fade-in" style={{ textAlign: "center", padding: "1rem", border: "2px dashed var(--color-salvia)", borderRadius: "8px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>Escaneie o QR Code ou use o Copia e Cola:</p>
            <div style={{ background: "#eee", height: "150px", width: "150px", margin: "0 auto 1rem auto", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
              [QR Code]
            </div>
            <textarea 
              readOnly 
              value={pixPayload} 
              style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid var(--color-areia)", resize: "none" }} 
            />
            <button type="button" className="btn" style={{ marginTop: "1rem" }} onClick={() => setSuccess(true)}>
              Já realizei o pagamento
            </button>
          </div>
        ) : (
          <button type="submit" className="btn" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Processando..." : (method === "PIX" ? "Gerar PIX - R$ 27,90" : "Pagar R$ 27,90")}
          </button>
        )}
      </form>
    </div>
  );
}
