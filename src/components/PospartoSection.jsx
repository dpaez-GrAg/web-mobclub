import React from "react";
import { Link } from "react-router-dom";
import TypewriterText from "./TypewriterText";
import { Steoller } from "@icon-park/react";
import "./PospartoSection.css";

const PospartoSection = () => {
  return (
    <section className="posparto-section" id="posparto">
      <div className="posparto-container">
        <div className="posparto-header">
          <h4>
            <Steoller size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
            Posparto
          </h4>
          <TypewriterText
            lines={["No esperes que, después de ser madre, tu cuerpo se recupere solo"]}
            as="h2"
            delay={0.08}
            triggerOnScroll={true}
          />
        </div>

        <div className="posparto-content">
          <div className="section-copy">
            <p>
              Por mucho que quieras, no puedes pretender recuperar en dos días los cambios que tu cuerpo ha hecho en
              nueve meses.
            </p>
            <p>
              <strong>Y menos, sin un plan.</strong>
            </p>
            <p>
              Si tu rehabilitación posparto son tres ejercicios esporádicos que te ha mostrado el algoritmo, permíteme
              decirte, va para largo.
            </p>
            <p>
              Si confías en que el tiempo cierre la diástasis o te devuelva la estabilidad a tu cuerpo… pues hay cosas
              que el tiempo no arregla.
            </p>

            <h3>¿Sabes qué es lo que sí se puede conseguir con una recuperación bien hecha?</h3>

            <p>Reencontrar tu consciencia.</p>
            <h3 style={{ textTransform: "uppercase" }}>
              <strong>Entrar en tus vaqueros antiguos</strong>
            </h3>
            <p>
              Reconectar con partes de tu cuerpo que llevan meses sin responder. Entiende esas nuevas sensaciones que no
              habías tenido hasta ahora.
            </p>
            <p>
              <strong>TU CONFIANZA VUELVE</strong>
              <br />
              Cuando empiezas a recuperar tu abdomen, suelo pélvico y tu imagen corporal.
              <br />
              Vuelve a habitar tu cuerpo. Mejora tu estado de ánimo.
              <br />
              Recupera la fuerza global y haz más fácil las tareas del día a día con tu bebé.
            </p>

            <p>
              Dormir mejor y regular tu energía
              <br />
              Dile a tu cuerpo cuándo tiene que activarse, y cuándo debe descansar.
            </p>

            <h3>
              Todo eso sí que se puede conseguir.
              <br />
              No tienes que resignarte.
              <br />
              Da igual cuánto tiempo haya pasado.
              <br />
              {/*               Hay una forma de recuperar control y seguridad después del parto. */}
            </h3>

            <p>👇 Comprueba si tu cuerpo está listo para la rehabilitación</p>
            <Link to="/posparto">
              <button className="btn-cta">Recibe tu evaluación posparto</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PospartoSection;
