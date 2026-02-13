import { Link } from "react-router-dom";
import heroImage from "../assets/images/DETAIL_01.jpeg";
import oyshoLogo from "../assets/logos/OYSHO PARTNER STUDIO.svg";
import TypewriterText from "./TypewriterText";
import EmailCapture from "./EmailCapture";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hero-container">
          <TypewriterText lines={["Si tu cuerpo", "está bien,", "tu vida funciona", "mejor"]} as="h1" delay={0.04} />

          <div className="hero-copy">
            <p>
              No por esforzarte al máximo en tus entrenamientos vas a obtener mejores resultados.
              <br />
              Tampoco es necesario terminar tan cansado que el resto del día vaya cuesta arriba.
              <br />Y tampoco necesitas pasar cada día dos horas en el gym.
            </p>

            <p>Clases individuales de Pilates con Máquinas.</p>

            <p>
              Diseñadas especialmente para ti.
              <br />
              Planificada y adaptada a tu cuerpo, a tu momento vital y a cómo te encuentras cada día.
            </p>
          </div>

          <div className="hero-button">
            <Link to="/reserva" className="btn-cta">
              Reservar Clase
            </Link>
          </div>
        </div>

        <div className="hero-img">
          <img src={heroImage} alt="Profesora indicando a alumna de pilates" />
        </div>
      </div>

      {/*       <div className="hero-partner">
        <img src={oyshoLogo} alt="OYSHO Partner Studio" />
      </div> */}

      <div className="hero-copy-extended">
        <p>
          La mayoría de las personas creen que por hacer más ejercicio van a estar mejor, pero nada más lejos de la
          realidad.
        </p>

        <p>Por eso diseñamos nuestro método MOB. Muy efectivo para personas con muy poco tiempo.</p>

        <p>
          No trabajamos entrenamientos genéricos.
          <br />
          Por esa pequeña obviedad de que <strong>no todos los cuerpos son iguales,</strong> ni todos los días te
          levantas con el mismo pie.
        </p>

        <p>
          No esperes a que tu cuerpo diga basta.
          <br />
          Porque cuando tu cuerpo falla, pierdes la confianza en ti mismo.
        </p>

        <h3>
          Puedes aprovechar tu tiempo si el cuerpo lo permite,{" "}
          <em>o puedes lamentarte de no haberlo hecho cuando seas viejo.</em>
        </h3>

        <p>Aquí trabajarás con planificación y estrategia para devolverle a tu cuerpo su mejor estado de forma.</p>

        <p>
          Dejando atrás dolores o molestias que <em>no son normales de la edad</em>.
          <br />
          Te ayudamos a prepararte para una nueva etapa. 🤰
          <br />O trabajamos para recuperar tu cuerpo después.
        </p>

        <p>
          La sensación que tendrás en tu cuerpo después de cada clase es tan difícil de describir.
          <br />
          Que es mejor que la experimentes por ti mismo.
        </p>

        <h3>Lo único que debes hacer es...</h3>

        <EmailCapture buttonText="Empezar" tag="suscribete" />
      </div>
    </section>
  );
};

export default Hero;
