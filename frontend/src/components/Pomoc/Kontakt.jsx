import React, { useState } from 'react';
import './Help.css';

export function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formularz wysłany:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="help-page">
      <h1>Kontakt</h1>
      <div className="help-content">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Dane kontaktowe</h2>
            <div className="info-item">
              <i className="icon">✉️</i>
              <div>
                <h3>Email</h3>
                <p>kontakt@blik2blackjack.com</p>
                <p>pomoc@blik2blackjack.com (wsparcie techniczne)</p>
              </div>
            </div>

            <div className="info-item">
              <i className="icon">📞</i>
              <div>
                <h3>Telefon</h3>
                <p>+48 123 456 789 (obsługa klienta)</p>
                <p>+48 987 654 321 (dział płatności)</p>
              </div>
            </div>

            <div className="info-item">
              <i className="icon">🕒</i>
              <div>
                <h3>Godziny pracy</h3>
                <p>Pon-Pt: 9:00-17:00</p>
                <p>Sob-Ndz: 10:00-15:00</p>
              </div>
            </div>

            <div className="info-item">
              <i className="icon">📍</i>
              <div>
                <h3>Adres</h3>
                <p>Blik2Blackjack Sp. z o.o.</p>
                <p>ul. Rozpusty 420</p>
                <p>69-420 Morenka, Polska</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Formularz kontaktowy</h2>
            {isSubmitted ? (
              <div className="success-message">
                Dziękujemy za wiadomość! Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Imię i nazwisko</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Temat</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Wybierz temat</option>
                    <option value="account">Konto użytkownika</option>
                    <option value="payments">Wpłaty i wypłaty</option>
                    <option value="games">Problemy z grami</option>
                    <option value="other">Inne</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Wiadomość</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Wyślij wiadomość</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}