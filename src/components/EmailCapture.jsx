import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmailCapture.css";

const EmailCapture = ({ buttonText = "Enviar", tag = "" }) => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && accepted) {
      try {
        const payload = {
          email,
          tag,
          accepted,
          opted_in_at: new Date().toISOString(),
          page_url: window.location.href,
          page_path: window.location.pathname,
          referrer: document.referrer || "",
          user_agent: navigator.userAgent,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          source: window.location.hostname,
        };

        const response = await fetch("https://n8n.gridded.agency/webhook/b05a4a9c-059c-4deb-940f-8dcf2062c2f8", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Email enviado correctamente");
          navigate("/confirmacion");
        } else {
          console.error("Error al enviar el email");
          alert("Hubo un error. Por favor, inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <form className="email-capture" onSubmit={handleSubmit}>
      <input
        type="email"
        className="email-input"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="privacy-checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          required
        />
        <label htmlFor="privacy-checkbox">
          Acepto recibir tus emails comerciales y la{" "}
          <Link to="/legal" className="privacy-link">
            política de privacidad
          </Link>
          .
        </label>
      </div>

      <button type="submit" className="btn-cta">
        {buttonText}
      </button>
    </form>
  );
};

export default EmailCapture;
