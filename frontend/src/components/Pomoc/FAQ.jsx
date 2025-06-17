import React, { useState } from 'react';
import './Help.css';

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
{
      question: "Dlaczego moja wypłata jest opóźniona?",
      answer: "Typowe przyczyny to: okres świąteczny, konieczność dodatkowej weryfikacji, lub wybór metody płatności o dłuższym czasie przetwarzania."
    },
    {
      question: "Czy mogę anulować wypłatę?",
      answer: "Tylko jeśli status wypłaty to 'Oczekująca'. Skontaktuj się z działem obsługi klienta."
    },

  {
    question: "Jak długo trwa weryfikacja konta?",
    answer: "Standardowa weryfikacja trwa do 24 godzin roboczych. W okresach zwiększonego ruchu może potrwać do 48 godzin."
  },
  {
    question: "Czy mogę grać na kilku urządzeniach jednocześnie?",
    answer: "Możesz logować się na różnych urządzeniach, ale tylko jedno aktywne połączenie jest dozwolone w tym samym czasie."
  },
  {
    question: "Jakie są limity wypłat?",
    answer: (
      <>
        <p>Standardowe limity wypłat:</p>
        <ul>
          <li>Minimalna wypłata: 50 PLN</li>
          <li>Maksymalna dzienna wypłata: 10 000 PLN</li>
          <li>Miesięczny limit wypłat: 50 000 PLN</li>
        </ul>
        <p>Dla graczy VIP limity mogą być wyższe.</p>
      </>
    )
  },
  {
    question: "Co zrobić jeśli zapomnę hasła?",
    answer: "Kliknij 'Zapomniałem hasła' na stronie logowania. Otrzymasz e-mail z linkiem do resetowania hasła."
  },
  {
    question: "Czy mogę mieć wiele kont w kasynie?",
    answer: "Nie, posiadanie wielu kont jest zabronione. W przypadku wykrycia wielu kont, wszystkie mogą zostać zablokowane."
  },
  {
    question: "Co to jest RTP w grach?",
    answer: "RTP (Return to Player) to procent stawki, który gracz może teoretycznie odzyskać z gry w dłuższym okresie. Np. RTP 96% oznacza, że średnio 96% stawki wraca do graczy."
  }
];

  return (
    <div className="help-page">
      <div className="help-content">
        <h1>Najczęstsze pytania</h1>

        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
                <span className="faq-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path
                      fill="currentColor"
                      d={activeIndex === index ? "M4 10l4-4 4 4" : "M10 4l-4 4-4-4"}
                    />
                  </svg>
                </span>
              </button>

              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? '500px' : '0',
                  padding: activeIndex === index ? '0 0 1rem 0' : '0'
                }}
              >
                <div className="faq-answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}