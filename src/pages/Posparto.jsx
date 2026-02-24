import React, { useEffect, useState } from "react";
import SEO from "../components/SEO";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Posparto.css";

const Posparto = () => {
  const [showFormulario, setShowFormulario] = useState(false);
  const revealRef = useScrollReveal();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="posparto-page">
      <SEO
        title="Recuperación posparto Pilates | Mobclub A Coruña"
        description="Rehabilitación posparto individual para recuperar abdomen, suelo pélvico y confianza corporal con un plan adaptado a tu cuerpo."
        ogTitle="Tu cuerpo no vuelve solo después de ser madre"
        ogDescription="Recuperación posparto individual para volver a sentir control, seguridad y confianza en tu cuerpo, aunque hayan pasado años."
        path="/posparto"
      />
      <section className="posparto-intro reveal" ref={revealRef}>
        <div className="posparto-intro-container">
          {/*           <p>
            Deja de escuchar antiguos mitos y creencias arraigadas que, por mucho que nos han intentado meter en la
            cabeza como la fuente de la verdad, no lo son.
          </p> */}
          <p>
            <strong>Porque no todos los cuerpos son iguales.</strong>
            <br />
            No todos los partos son iguales.
            <br />Y tampoco todas las recuperaciones posparto son iguales.
          </p>
          <h2>Claro que es posible recuperar tu cuerpo, en pocas semanas, con una buena rehabilitación posparto</h2>
          <p>
            Pero antes, déjame decirte <strong>que NO debes hacer</strong> si quieres volver a usar tu ropa interior
            antes de que tu bebé dé sus primeros pasos
          </p>
          <ul>
            <li>Tener prisa por volver</li>
            <li>Hacer el mismo tipo de entrenamiento que hacías antes de dar a luz</li>
            <li>Ponerte a hacer hipopresivos como loca</li>
            <li>No permitirte ni un minuto para ti misma</li>
          </ul>
          <p>Podría seguir con una lista interminable, pero es mejor que te diga lo que se puede hacer.</p>
          <h3>Da igual que hayan pasado semanas o años.</h3>
          <p>
            Si no te has ocupado de recuperar tu cuerpo tras tener un bebé, es normal que sigas arrastrando los
            problemas venidos del embarazo o el parto.
          </p>
          <p>Y es que hay cosas que no se arreglan solas.</p>
          <p>Si hace unas pocas semanas que has dado a luz, es hora de comenzar tu rehabilitación posparto.</p>
          <p>
            Vuelve a tus hábitos con seguridad.
            <br />
            No te pongas a intentar hacer ejercicio sin control antes de que tu matrona te dé el ok.
            <br />
            Forzar ahora puede hacerte dar varios pasos atrás.
          </p>
          <p>Y si han pasado meses (o años), no dejes pasar otro tanto.</p>
          <p>
            Por si no lo sabes, la tripita de embarazada no baja por mucha dieta que hagas.
            <br />
            La debilidad de suelo pélvico, si no se trabaja, va a ir a peor.
            <br />
            El dolor de zona lumbar o la fatiga no son consecuencia de la edad.
          </p>
          <p>
            Y lo último que quieres es terminar pasando por una cirugía por un problema que se puede recuperar con un
            buen plan de recuperación posparto.
          </p>
          <h3>¿No crees que para cuidar BIEN de los tuyos, lo primero que debes es estar tú BIEN?</h3>
          <p>
            Y con "bien" no me refiero al 70%.
            <br />
            Busca el 100%
          </p>
          <p>
            No me hace falta convencerte de que, si eres una mujer con un cuerpo funcional, serás una mujer más feliz y
            podrás disfrutar mejor de los tuyos.
          </p>
          <p>Y ellos de ti.</p>
          <p>
            Es por eso que invertir TU tiempo en TI misma no es egoísmo.
            <br />
            Es lo normal.
          </p>
          <p>Entiendo que tengas dudas sobre si es momento de comenzar con tu recuperación.</p>
          <p>
            Es por eso que quiero ofrecerte un informe personalizado, para que puedas comprobar si tu cuerpo{" "}
            <strong>está preparado para la recuperación posparto</strong>.
          </p>
          <h2>Responde a estas preguntas y lo tendrás</h2>
          {!showFormulario && (
            <button className="btn-cta" onClick={() => setShowFormulario(true)}>
              Evalúa tu recuperación
            </button>
          )}
        </div>
      </section>

      <section className={`formulario-tally ${showFormulario ? "formulario-tally-open" : ""}`}>
        <iframe
          data-tally-src="https://tally.so/embed/jalxgx?hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="500"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Evaluación de recuperación posparto"
        ></iframe>
      </section>
    </div>
  );
};

export default Posparto;
