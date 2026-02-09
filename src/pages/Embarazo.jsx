import React from "react";
import SEO from "../components/SEO";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Embarazo.css";
import EmailCapture from "../components/EmailCapture";

const Embarazo = () => {
  const revealRef = useScrollReveal();

  return (
    <div className="embarazo-page">
      <SEO
        title="Ejercicio seguro durante el embarazo | Mobclub A Coruña"
        description="Movimiento adaptado y pilates individual para embarazadas. Aprende qué ejercicio es seguro durante el embarazo con criterio y acompañamiento profesional."
        ogTitle="Ejercicio en el embarazo, sin miedo y con criterio"
        ogDescription="Descubre qué movimiento es seguro durante el embarazo y cómo cuidarte en cada etapa con acompañamiento profesional."
        path="/embarazo"
      />
      <section className="embarazo-intro reveal" ref={revealRef}>
        <div className="embarazo-intro-container">
          <h1>
            Estar embarazada es un estado,
            <br />
            no una enfermedad
          </h1>

          <p>Y es por eso que no deberías dejar de moverte.</p>

          <p>Tu cuerpo está cambiando. No siempre es fácil interpretar lo que necesitas en cada momento.</p>

          <p>Hay semanas con mucha energía. Y otras, pues no tanta.</p>

          <p>
            Tanto si vienes de un tiempo en el que has entrenado con regularidad, como si llevabas una vida sedentaria,
            en un embarazo sano, el ejercicio adaptado no aumenta el riesgo de aborto ni de parto prematuro.
          </p>

          <h3>
            Es más, bien planteado, te ayudará a controlar el peso, reducir el dolor lumbar y evitar los bajones,
            manteniendo estables tus niveles de energía.
          </h3>

          <p>
            Ahora bien.
            <br />
            Que moverte sea positivo no significa que todo valga.
          </p>

          <p>
            Durante el embarazo, seguir recomendaciones <em>paratodaslasembarazadas</em>, o hacer los ejercicios del
            último video que te ha mostrado el algoritmo, no es la mejor idea.
          </p>

          <p>
            <strong>Se trata de hacerlo bien.</strong>
          </p>

          <p>
            No es momento de improvisar.
            <br />
            Es tiempo de cuidarte y de invertir en ti.
            <br />
            De confiar en profesionales que saben adaptar el movimiento a cada etapa y a cada día.
          </p>

          <p>
            Porque durante el embarazo, tu cuerpo no es el mismo cada mes.
            <br />Y el ejercicio, tampoco debería serlo.
          </p>

          <p>
            No es momento de tensión ni exigencias. Es la hora de hacer ejercicio con planificación, escuchando tu
            cuerpo y ajustando el nivel de esfuerzo a cómo te encuentras.
          </p>

          <h3>
            La idea es que salgas de cuentas con los deberes hechos.
            <br />
            No que llegues al parto agotada.
          </h3>

          <p>
            Porque en Mobclub llevamos años acompañando a mujeres durante el embarazo, y también en la recuperación
            posparto.
            <br />
            Por eso muchas, al despedirse, ya están pensando en volver.
          </p>

          <p>
            👇 Si ahora mismo te preguntas qué puedes hacer con tranquilidad, y qué es mejor evitar en tu caso, he
            preparado una guía clara y práctica para que te ayude a entenderlo.
          </p>

          <EmailCapture buttonText="Necesito esa guía" tag="embarazo-lead-magnet" />
        </div>
      </section>
    </div>
  );
};

export default Embarazo;
