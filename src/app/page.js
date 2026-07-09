"use client";

import { useState, useEffect } from "react";
import { SignUpButton, SignInButton, Show } from '@clerk/nextjs';
import CheckoutAsaas from "@/components/CheckoutAsaas";

const questions = [
  {
    title: "Selecione seu gênero para continuar.",
    options: ["Mulher", "Homem"],
  },
  {
    title: "A sua casa hoje reflete a história e os valores da sua família, ou parece apenas um catálogo impessoal?",
    options: ["Reflete nossa história", "Parece um catálogo", "Um meio termo"],
  },
  {
    title: "Há quanto tempo a sua casa não recebe uma melhoria estrutural ou estética com intencionalidade?",
    options: ["Menos de 1 ano", "1 a 3 anos", "Mais de 5 anos", "Nunca fiz"],
  },
  {
    title: "Quando você entra em casa, sente que ela abraça a sua família, ou transmite certa frieza e desconexão?",
    options: ["Ela nos abraça", "É bonita, mas fria", "É desconfortável e fria"],
  },
  {
    title: "O mobiliário da sua casa hoje funciona para a vida real da sua família, ou apenas parece bonito mas é imprático?",
    options: ["Funciona super bem", "É imprático no dia a dia", "Nem bonito, nem funcional"],
  },
  {
    title: "A estética atual da sua casa traz paz visual e elevação, ou a mistura de estilos gera cansaço mental?",
    options: ["Traz muita paz", "Gera cansaço e confusão", "É totalmente neutra"],
  },
  {
    title: "A estrutura da sua casa traz segurança e previsibilidade, ou você vive 'apagando incêndios'?",
    options: ["Traz segurança", "Tenho problemas frequentes", "Vivo resolvendo problemas"],
  },
  {
    title: "A sua casa funciona como um verdadeiro refúgio de descanso para você e sua família?",
    options: ["Com certeza", "Às vezes", "Muito pouco"],
  },
  {
    title: "Qual o seu maior medo na hora de pensar em reformar ou decorar?",
    options: ["Estourar o orçamento", "Errar na estética", "A casa ficar fria e sem alma", "Dor de cabeça com obra"],
  },
  {
    title: "Se nada mudasse na sua casa nos próximos 5 anos, como isso impactaria o conforto da sua família?",
    options: ["Não impactaria", "Seria bem frustrante", "Afetaria muito nossa convivência"],
  }
];

export default function FunnelPage() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [loadingMsg, setLoadingMsg] = useState("");
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });

  // Pula a introdução direto para a primeira pergunta se o usuário clicar
  const startQuiz = () => setStep(0);

  const handleAnswer = (index) => {
    setAnswers({ ...answers, [step]: index });
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 400);
  };

  useEffect(() => {
    if (step === questions.length) {
      // Tela de loading
      let msgs = [
        "Analisando suas respostas...",
        "Calculando o nível de conforto e acolhimento...",
        "Montando seu diagnóstico..."
      ];
      let i = 0;
      setLoadingMsg(msgs[i]);
      const interval = setInterval(() => {
        i++;
        if (i < msgs.length) {
          setLoadingMsg(msgs[i]);
        } else {
          clearInterval(interval);
          setTimeout(() => setStep(questions.length + 1), 1000);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    // Aqui enviaríamos os dados do lead para o Supabase
    // Após salvar, vai para o Upsell
    setStep(questions.length + 2);
  };

  return (
    <div className="container animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="noise-overlay"></div>
      
      {/* INTRO */}
      {step === -1 && (
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Descubra a <span className="script-text" style={{ fontSize: '1.2em' }}>vocação</span> da sua casa
          </h1>
          <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--color-text)' }}>
            Faça este diagnóstico rápido e descubra se o seu lar está preparado para acolher sua família com beleza e praticidade.
          </p>
          <button className="btn" onClick={startQuiz}>
            Iniciar Diagnóstico
          </button>
        </div>
      )}

      {/* QUIZ */}
      {step >= 0 && step < questions.length && (
        <div className="glass-card animate-fade-in" key={step}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center' }}>
            {questions[step].title}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {questions[step].options.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option ${answers[step] === i ? 'selected' : ''}`}
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LOADING */}
      {step === questions.length && (
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div className="progress-bar" style={{ margin: '0 auto 2rem auto', width: '50%' }}>
            <div className="progress-fill" style={{ width: '100%', animation: 'fadeIn 2s infinite alternate' }}></div>
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>{loadingMsg}</h2>
        </div>
      )}

      {/* LEAD CAPTURE (FREE E-BOOK) */}
      {step === questions.length + 1 && (
        <div className="glass-card animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'row', minHeight: '500px', flexWrap: 'wrap' }} className="split-layout">
            
            {/* Lado da Imagem e Marca */}
            <div style={{ flex: '1 1 300px', position: 'relative', backgroundColor: 'var(--color-petroleo)', color: 'var(--color-creme)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                <img src="/assets/luane-hero.jpg" alt="Luane Melo" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
              </div>
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 300 384" fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round"><path d="M150 8 L292 150 L8 150 Z"/><path d="M40 150 V376 H260 V150"/><path d="M80 150 A70 70 0 0 1 220 150"/><path d="M112 150 A38 38 0 0 1 188 150"/><line x1="150" y1="150" x2="150" y2="80"/><line x1="150" y1="150" x2="98" y2="98"/><line x1="150" y1="150" x2="202" y2="98"/><line x1="95" y1="150" x2="95" y2="376"/><line x1="150" y1="150" x2="150" y2="376" strokeWidth="5"/><line x1="205" y1="150" x2="205" y2="376"/><line x1="40" y1="306" x2="260" y2="306"/><path d="M40 306 V250 A27.5 27.5 0 0 1 95 250 V306"/><path d="M150 306 V250 A27.5 27.5 0 0 0 95 250"/><path d="M150 306 V250 A27.5 27.5 0 0 1 205 250"/><path d="M205 250 A27.5 27.5 0 0 1 260 250 V306"/></svg>
                  <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-base)', fontWeight: 600 }}>Casa<em className="script-text" style={{ color: 'var(--color-areia)', marginLeft: '4px' }}>Bela</em></span>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', opacity: 0.8 }}>Arquitetura tradicional</p>
                  <h1 style={{ fontSize: '2rem', lineHeight: 1.1, margin: '1rem 0', color: 'var(--color-creme)' }}>Sua casa não precisa ser grande.<br/>Precisa ser <em className="script-text">bem pensada.</em></h1>
                </div>
              </div>
            </div>

            {/* Lado do Conteúdo / Auth */}
            <div style={{ flex: '1 1 300px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'var(--color-creme)' }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', textAlign: 'center' }}>
                Seu diagnóstico está <span className="script-text">pronto!</span>
              </h2>
              <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-text)' }}>
                A sua casa precisa resgatar a sua essência. Baixe agora mesmo o seu guia gratuito <strong>"Os 5 Pilares de uma Casa que Acolhe"</strong> e dê o primeiro passo para a mudança.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <Show when="signed-out">
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-salvia)', textAlign: 'center' }}>
                    Cadastre-se rapidamente para destrancar seu resultado:
                  </p>
                  <SignUpButton mode="modal">
                    <button className="btn" style={{ width: '100%', maxWidth: '300px' }}>Cadastrar e Ver Resultado</button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <button style={{ background: 'none', border: 'none', color: 'var(--color-petroleo)', textDecoration: 'underline', cursor: 'pointer', marginTop: '0.5rem', fontFamily: 'var(--font-base)', fontSize: '1rem' }}>Já tenho conta</button>
                  </SignInButton>
                </Show>

                <Show when="signed-in">
                  <button className="btn" onClick={() => setStep(questions.length + 2)} style={{ width: '100%', maxWidth: '300px' }}>
                    Ver Meu Diagnóstico
                  </button>
                </Show>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* UPSELL + ASAAS CHECKOUT */}
      {step === questions.length + 2 && (
        <div className="glass-card animate-fade-in">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ backgroundColor: 'var(--color-salvia)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              Guia enviado para o seu e-mail!
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', textAlign: 'center' }}>
            Dê o próximo passo definitivo.
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Adquira o <strong>E-book Premium "A Casa Tradicional na Prática"</strong> por apenas R$ 27,90 e tenha acesso a checklists, referências e passos práticos para aplicar o que a arquitetura tradicional ensina no seu lar.
          </p>
          
          <CheckoutAsaas />
        </div>
      )}
    </div>
  );
}
