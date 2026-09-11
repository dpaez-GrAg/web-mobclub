import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Reserva.css";

const Reserva = () => {
  const revealRef = useScrollReveal();

  return (
    <div className="reserva-page">
      <section className="reserva-intro reveal" ref={revealRef}>
        <div className="reserva-intro-container">
          <h1>Reserva tu primera sesión</h1>
          <p>
            No es una clase convencional.
            <br />
            Es una valoración individual para entender tu cuerpo y diseñar el plan que mejor se adapte a tí.
          </p>
        </div>
      </section>

      <section className="reserva-iframe-section">
        <iframe
          src="https://reservaweb.viday.es/#/client/6419ed1707f10931823438c1?service=6548c49ed3158401307ebf10"
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
