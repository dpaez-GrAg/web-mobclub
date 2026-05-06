import { useEffect } from "react";
import SEO from "../components/SEO";
import EmailCapture from "../components/EmailCapture";
import useScrollReveal from "../hooks/useScrollReveal";
import "./TallerAlimentacionMenopausia.css";

const TallerAlimentacionMenopausia = () => {
  const revealRef = useScrollReveal();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="taller-alimentacion-menopausia-page">
      <SEO
        title="Taller Alimentación Menopausia | Mobclub A Coruña"
        description="Taller presencial el domingo 17 de mayo. Aprende a adelantarte a la menopausia con nutrición, pilates adaptado y un espacio para compartir con otras mujeres."
        ogTitle="No puedes esquivar la menopausia, pero sí adelantarte a ella"
        ogDescription="Un taller de tres horas en Mobclub para entender y afrontar la peri y menopausia con criterio. Nutrición, pilates y comunidad."
        path="/talleralimentacionmenopausia"
      />

      <section className="taller-intro reveal" ref={revealRef}>
        <div className="taller-intro-container">
          <h3>Taller de alimentación estratégica</h3>

          <h1>No puedes evitar la menopausia, pero si prepararte para ella</h1>

          <h3>
            Aprenderás <strong>técnicas muy sencillas de aplicar</strong> para gestionar los síntomas que hasta tu
            ginecóloga te preguntará cómo lo haces.
          </h3>

          <p>Hay varias cosas que son inevitables en la vida, tarde o temprano llegarán. </p>
          <p>
            <strong>El climaterio en las mujeres es una de ellas.</strong>
          </p>
          <p>
            No hace falta que te diga todo lo que trae consigo. <br />
            Si estás metida de lleno en medio de esta etapa, o ya lo has pasado, sabes más que de sobra de lo que te
            hablo.
            <br />Y si lo ves a la vuelta de la esquina, te recomiendo que te intereses sobre ello.
          </p>

          <p>
            En la vida se dan situaciones donde es imposible prever lo que va a pasar. <br />
            La mayoría. <br />
            Pero lo que sí puedes hacer, es preparar una red de seguridad para esos imprevistos. Y tejer esa red, en
            este caso, significa reunir toda la información para afrontar esas situaciones de la mejor manera posible.
          </p>

          <p>
            <strong>La menopausia no es una enfermedad</strong>.
          </p>
          <p>
            Es un hito en la vida de todas las mujeres. <br />
            Tradicionalmente nos han intentado convencer de que significa que te haces vieja. <br />
            Yo estoy totalmente en desacuerdo con esto.
          </p>

          <p>
            Es verdad que la edad es solo un número. <br />
            Salta a la vista que hay mujeres con 50 con mejor salud y aspecto físico que muchas de 35. <br />
            Si les preguntas, te dirán que no es fácil.
            <br /> <strong>Hay que saber cuidarse para llegar a los 50 estupenda.</strong>
          </p>

          <p>
            Por eso hemos preparado este taller. El título no nos convencía mucho. Pero es que estábamos muy ocupados
            preparando el contenido y eso lo dejamos para el último momento.
          </p>

          <p>
            Si te has resignado a que las noches ya no son para dormir del tirón. <br />
            Que en medio de una reunión te entre un sofoco que te haga sudar como un río. <br />O has asumido que el
            sobrepeso te va a acompañar durante el resto de tu vida.
          </p>

          <h2>
            <strong>Este taller es para ti.</strong>
          </h2>

          <h3>Una jornada en la que entenderás:</h3>

          <ul>
            <li>
              Por qué no te libras de <strong>esos kilos de más.</strong>
            </li>
            <li>
              <strong>¿Ejercicio de fuerza? </strong>Por qué, además, debes incluir esto todas las semanas.
            </li>
            <li>
              La clave para <strong>evitar la debilidad</strong> en tus huesos.
            </li>
            <li>
              Cómo prepararte para <strong>no ponerte nunca enferma,</strong> con un sistema inmune a prueba de balas.
            </li>
            <li>
              <strong>¿No sabes con quién hablar de ello?</strong> La solución el domingo 17.
            </li>
            <li>
              Qué puedes aprender de los gorriones que hará que{" "}
              <strong>tu corazón funcione como recién salido del concesionario</strong>.
            </li>
            <li>
              ¿Te sientes <strong>hinchada como un globo</strong>? Los tres elementos principales para regular la
              inflamación.
            </li>

            <li>
              El error más común que lo echa todo a perder a la hora de <strong>tomar suplementos</strong>.
            </li>
          </ul>

          <p>
            El taller es <strong>presencial, en nuestro centro Mobclub, el domingo 17 de mayo a las 9.30h. </strong>
            <br />
            Una mañana en la que:
          </p>

          <ul>
            <li>
              Aprenderás, en una <strong>sesión práctica</strong> con una{" "}
              <strong>experta en nutrición y salud hormonal femenina</strong>, las claves de la alimentación en la etapa
              de la peri y menopausia.
            </li>
            <li>
              <strong>Liberarás tu cuerpo</strong> en una sesión de Pilates adaptada a este momento.
            </li>
            <li>
              Compartirás la <strong>experiencia con otras mujeres</strong> que están pasando por lo mismo.
            </li>
            <li>
              Disfrutarás de un <strong>brunch</strong> para compartir y poner en práctica todo lo aprendido.
            </li>
          </ul>

          <h3>
            El precio del taller son <strong>50 euros</strong>.
          </h3>

          <p>
            El precio es simbólico. <br />
            Con la información que conseguirás en la sesión con la especialista en nutrición y salud hormonal de la
            mujer ya lo amortizas.
            <br />
            Pero es que te llevas todo lo demás: una clase enfocada en la etapa peri y menopausia, un brunch con
            producto local y lo más importante.
          </p>
          <h3>Un espacio donde compartir experiencia con otras mujeres que están pasando lo mismo que tú.</h3>

          <p>Las plazas están limitadas a 10.</p>

          <div className="taller-stripe">
            <stripe-buy-button
              buy-button-id="buy_btn_1TSMVkLvNe4RargKM2P8BFk6"
              publishable-key="pk_live_51NrgEILvNe4RargKlBEd3vMhTitnszfM3HLXbc0p0CI2DJ5KwaWL31IYAMpR3w5P5PypRWgumJX7enggOv1Bmm5i003rznk5rf"
            />
          </div>

          <h3>
            Reserva ahora y recibe la <strong>guía con los cinco alimentos clave</strong> en la etapa de la menopausia y
            peri menopausia.
          </h3>

          <p>Pd.1: Si llevas tiempo probando cosas sin sentido, esto te ahorrará meses y dolores de cabeza.</p>
          <p>Pd.2: Si te interesa, reserva. No vamos a repetir este taller constantemente.</p>
          <p>Pd.3: Reserva.</p>
          <div className="taller-stripe">
            <stripe-buy-button
              buy-button-id="buy_btn_1TSMVkLvNe4RargKM2P8BFk6"
              publishable-key="pk_live_51NrgEILvNe4RargKlBEd3vMhTitnszfM3HLXbc0p0CI2DJ5KwaWL31IYAMpR3w5P5PypRWgumJX7enggOv1Bmm5i003rznk5rf"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TallerAlimentacionMenopausia;
