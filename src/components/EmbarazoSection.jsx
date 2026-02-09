import React from "react";
import { Link } from "react-router-dom";
import TypewriterText from "./TypewriterText";
import { PregnantWomen } from "@icon-park/react";
import "./EmbarazoSection.css";

const EmbarazoSection = () => {
  return (
    <section className="embarazo-section" id="embarazo">
      <div className="embarazo-container">
        <div className="embarazo-header">
          <h4>
            <PregnantWomen size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
            Embarazo
          </h4>
          <TypewriterText
            lines={["Es normal que tengas dudas sobre qué ejercicio es seguro durante el embarazo"]}
            as="h2"
            delay={0.08}
            triggerOnScroll={true}
          />
        </div>

        <div className="embarazo-content">
          <div className="section-copy">
            <p>Casi todas las mujeres embarazadas se preguntan si el ejercicio puede hacer daño al bebé.</p>
            <p>
              Un día escuchas que es mejor moverte.
              <br />
              Al siguiente, que tengas cuidado.
            </p>

            <h3>
              Que si un esfuerzo puede adelantar el parto.
              <br />
              Pero que quedarte parada tampoco va a ser buena idea.
            </h3>

            <p>
              Todo el mundo opina.
              <br />Y todo el que se cruza contigo se convierte en consejero especialista porque
              <em> yo ya pasé por dos hace veinte años.</em>
              <br />
              Aunque aquel contexto era muy distinto al actual.
            </p>

            <p>
              Es normal, que te entren dudas.
              <br />
              Y no es un problema.
              <br />
              Es señal de que quieres hacerlo bien.
            </p>

            <p>
              Hoy sabemos que, en un embarazo sano, hacer ejercicio adaptado no solo es seguro.
              <br />
              Sino que ayuda a encontrarte mejor durante el embarazo.
              <br />Y a preparar mejor tu cuerpo para el parto y el posparto.
            </p>

            <p>
              <strong>Eso sí, no todo vale.</strong>
            </p>

            <h3 style={{ textTransform: "uppercase" }}>
              Durante el embarazo tu cuerpo cambia.
              <br />
              El movimiento también debería hacerlo.
            </h3>

            <p>👇 Descubre qué tipo de ejercicio puedes hacer con seguridad en esta etapa.</p>
            <Link to="/embarazo" className="btn-cta">
              Dime qué puedo hacer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmbarazoSection;
