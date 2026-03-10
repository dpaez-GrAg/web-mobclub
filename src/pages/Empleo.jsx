import EmailCapture from "../components/EmailCapture";
import "./Empleo.css";

const Empleo = () => {
  return (
    <div className="empleo">
      <div className="empleo-container">
        <div className="empleo-content text-informative">
          <h1>Ya está bien de que te tomen el pelo</h1>
          <p>
            Has llegado a normalizar las jornadas partidas de tres horas de clase. Que no tienes derecho a los festivos.
            O que lo normal es trabajar en varios centros para llegar a un salario decente.
          </p>

          <p>Nada mas lejos de la realidad. Si estás aquí es por que hay algo dentro de ti que en el fondo lo sabía.</p>

          <p>
            Quizá no tengas ni idea de Pilates. No es un problema para mi. Prefiero que estés motivada antes que tengas
            años de experiencia trabajando sucedaneos de lo que aquí hacemos.
          </p>

          <p>
            Soy exigente. Mucho. Si llegas a trabajar en Mobclub estarás al nivel de los mejores profesionales de la
            ciudad. Yo te daré la formación y las herramientas. Pero como no pongas dedicación por tu parte, nunca te
            contrataré.
          </p>

          <p>
            Y si llegas a unirte al equipo, no termina ahí. El crecimiento es exponencial. En todos los sentidos. Tu
            ganas, yo gano.
          </p>
        </div>
        <div className="email-capture-container">
          <h2>👇 Aprovecha esta oportunidad</h2>
          <EmailCapture buttonText="Apúntate aquí" tag="empleo" />
        </div>
      </div>
    </div>
  );
};

export default Empleo;
