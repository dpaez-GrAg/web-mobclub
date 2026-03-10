import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailPhoneCapture.css";

const EmailPhoneCapture = ({ buttonText = "Enviar", tag = "" }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\s/g, "");
    return /^[6-9]\d{8}$/.test(cleanPhone);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\s/g, "").slice(0, 9);

    let formattedValue = cleanValue;
    if (cleanValue.length > 3) {
      formattedValue = cleanValue.slice(0, 3) + " " + cleanValue.slice(3);
    }
    if (cleanValue.length > 6) {
      formattedValue = cleanValue.slice(0, 3) + " " + cleanValue.slice(3, 6) + " " + cleanValue.slice(6);
    }

    setPhone(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !phone) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!validatePhone(phone)) {
      alert("Por favor, introduce un número de teléfono válido.");
      return;
    }

    try {
      const payload = {
        email,
        phone: phone.replace(/\s/g, ""),
        tag,
      };

      const response = await fetch("https://n8n.gridded.agency/webhook/mobclubEmailPhoneCapture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Email y teléfono enviados correctamente");
        navigate("/confirmacion");
      } else {
        console.error("Error al enviar los datos");
        alert("Hubo un error. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form className="email-phone-capture" onSubmit={handleSubmit}>
      <input
        type="email"
        className="email-input"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="tel"
        className="phone-input"
        placeholder="Tu número de teléfono"
        value={phone}
        onChange={handlePhoneChange}
        required
      />

      <button type="submit" className="btn-cta">
        {buttonText}
      </button>
    </form>
  );
};

export default EmailPhoneCapture;
