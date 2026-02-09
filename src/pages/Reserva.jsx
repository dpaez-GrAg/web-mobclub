import React from "react";
import SEO from "../components/SEO";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Reserva.css";

const Reserva = () => {
  const revealRef = useScrollReveal();

  return (
    <div className="reserva-page">
      <SEO
        title="Reserva tu primera sesión | Mobclub A Coruña"
        description="Primera sesión de valoración individual para entender tu cuerpo y decidir cómo continuar. Reserva tu cita en Mobclub, A Coruña."
        ogTitle="Empieza por una primera sesión"
        ogDescription="No es una clase genérica. Es una valoración individual para entender tu cuerpo y empezar con criterio."
        path="/reserva"
      />
      <section className="reserva-intro reveal" ref={revealRef}>
        <div className="reserva-intro-container">
          <h2>Reserva tu primera sesión</h2>
          <p>
            No es una clase convencional.
            <br />
            Es una valoración individual para entender tu cuerpo y diseñar el plan que mejor se adapte a tí.
          </p>
        </div>
      </section>

      <section className="reserva-iframe-section">
        <iframe
          src="https://reservaweb.viday.es/#/client/6419ed1707f10931823438c1"
          width="100%"
          height="800"
          frameBorder="0"
          title="Sistema de reservas"
        ></iframe>
      </section>
    </div>
  );
};

export default Reserva;
