import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import { FAQ_SUELO_PELVICO } from "../routes.config";
import "./Servicio.css";

// Copy revisado por Diego en ARREGLO_VISIBILIDAD/copy/pilates-suelo-pelvico-a-coruna.md.
// Metadata y JSON-LD (Service + FAQPage) en src/routes.config.js.
//
// Dos reglas que esta página no puede romper al editarla:
//   1. Ni una promesa médica. Se dice qué se trabaja, nunca que se cura algo.
//   2. No se afirma que haya un programa específico de suelo pélvico: el método
//      parte del centro y el suelo pélvico está en el centro. Es lo que Diego
//      respondió literalmente, y es lo que se puede sostener.

const PilatesSueloPelvico = () => {
  const revealRef = useScrollReveal();

  return (
    <div className="servicio">
      <section className="servicio-intro reveal" ref={revealRef}>
        <div className="servicio-container">
          <h1>El suelo pélvico se trabaja antes de que sea un problema</h1>

          <p className="servicio-entradilla">
            En Mobclub, A Coruña, el suelo pélvico es asignatura troncal: cae siempre, en sesiones individuales de
            pilates con máquinas. No hace falta haber sido madre ni tener un diagnóstico. Basta con que hayas notado
            alguna señal y no quieras esperar a que crezca.
          </p>

          <div className="servicio-bloque">
            <p>
              Y aunque no nos lo digas, tu cuerpo nos lo contará. Nos daremos cuenta de tu debilidad, de una hipertonía
              o de una falta de contención a la que hagas dos ejercicios.
            </p>
            <p>Eso nos dará material para trabajar sobre ello.</p>
            <p>No tenemos soluciones genéricas. Cada plan se hace a la medida de tus necesidades.</p>
          </div>

          <div className="servicio-bloque">
            <h2>¿Cómo sé si tengo un problema de suelo pélvico?</h2>
            <p>
              Lo habitual es que las señales tempranas existan y no se les dé importancia. Estas son las que más nos
              cuentan:
            </p>
            <ul className="servicio-lista">
              <li>Se te escapan gotas al saltar, al correr o de tanto reír, y lo achacas al deporte.</li>
              <li>Después de ser madre notas una sensación de peso, y das por hecho que se pasará con el tiempo.</li>
              <li>
                Tienes molestias en las relaciones sexuales y lo interpretas como cansancio, o como que a estas alturas
                de la película ya no toca.
              </li>
              <li>
                Las pérdidas de orina o de gases son habituales, o tienes ganas de ir al baño a cada rato, y lo
                atribuyes a la menopausia.
              </li>
            </ul>
            <p>Ninguna de esas cosas es normal por mucho que sea frecuente.</p>
            <p>
              Lo que suele pasar es que algo que se podía haber abordado en fase inicial se convierte en un problema
              mayor. Y llega el día en que buscas una valoración cuando el diagnóstico ya te lo sabes. El momento de
              valorar era mucho tiempo atrás.
            </p>
          </div>

          <div className="servicio-bloque">
            <h2>Por qué no es solo un músculo</h2>
            <p>El suelo pélvico no es un músculo suelto, es un sistema.</p>
            <p>
              Piensa en tu centro como la estructura de una casa. El suelo pélvico son los cimientos. El abdomen y la
              zona lumbar son las paredes. El diafragma es el tejado.
            </p>
            <p>
              No hace falta ser arquitecto para saber que una casa se empieza por los cimientos. Todas las partes
              importan, pero los cimientos son los que sujetan.
            </p>
            <p>
              Ese sistema está hecho de músculos, ligamentos y otros tejidos que dan soporte a tus órganos, te permiten
              hacer pis y caca, y tienen función sexual y reproductiva. Te puedes imaginar los problemas que aparecen
              cuando no funciona.
            </p>
            <p>
              Y un detalle que casi nadie tiene en cuenta: un suelo pélvico sano no es el más fuerte, es el que tiene{" "}
              <strong>equilibrio entre fuerza y relajación</strong>. Uno permanentemente apretado da tantos problemas
              como uno débil.
            </p>
          </div>

          <div className="servicio-bloque">
            <h2>Interrumpir el chorrito no te va a ayudar</h2>
            <p>Sigue existiendo la creencia de que cortar el pis equivale a entrenar el suelo pélvico.</p>
            <p>
              No lo es. Lo que vas a conseguir haciéndolo a menudo es una infección de orina por no vaciar bien la
              vejiga.
            </p>
            <p>
              Ahora, un matiz: cortar el pis <strong>una vez</strong> sí te sirve para identificar qué músculos se
              activan. Es un buen punto de partida, y nada más que eso.
            </p>
            <p>
              Para el trabajo de verdad usamos otra imagen, la del ascensor: el suelo pélvico se <strong>eleva</strong>,
              al primero, al segundo, incluso al tercer piso. Elevar, que no apretar. Esa es toda la diferencia.
            </p>
          </div>

          <div className="servicio-bloque">
            <h2>Cómo se trabaja en clase</h2>
            <p>Tres claves, y las tres se entrenan en la sesión:</p>
            <p>
              <strong>Respira.</strong> Bien: expandiendo hacia los lados. Si respiras solo hacia delante, estás metiendo
              más presión sobre el suelo pélvico. Error común.
            </p>
            <p>
              <strong>Activa antes del esfuerzo.</strong> En todas las posiciones. Y mantenlo hasta el final del
              movimiento, no lo dejes a la mitad.
            </p>
            <p>
              <strong>Intégralo en tu día a día.</strong> De nada sirve hacerlo perfecto en clase y dejarte ir como una
              gelatina el resto de la semana. Lo que entrenas en la sesión es para las situaciones de tu vida real:
              coger al niño, un estornudo, una maleta.
            </p>
            <p>
              No es fácil, y lo entendemos. Requiere constancia y práctica, como casi todo. Por eso se trabaja con
              alguien delante corrigiendo, y no con un vídeo.
            </p>
            <p>Y como somos tan pesadas en clase, terminarás por interiorizarlo y hacerlo de manera involuntaria.</p>
          </div>

          <div className="servicio-bloque">
            <h2>Lo que cuesta no hacer nada</h2>
            <p>
              Cada vez más socios nos confiesan que pasar de su suelo pélvico les había hecho un roto en la cartera:
              cientos, a veces miles de euros en soluciones y profesionales que, al final, acababan recomendándoles
              hacer pilates.
            </p>
            <p>Para muchas personas esto sigue siendo un tema tabú a estas alturas de siglo.</p>
            <p>Aquí no lo es. Cae siempre.</p>
          </div>

          <div className="servicio-bloque">
            <h2>Para quién no es esto</h2>
            <p>
              No sustituimos un diagnóstico médico. Si ya tienes uno, o síntomas que te preocupan, empieza por tu
              ginecóloga o por una fisioterapeuta de suelo pélvico; trabajamos igual de bien contigo después, y mejor si
              vienes con información.
            </p>
            <p>
              Y si vemos que tu caso no lo podemos abordar con nuestro método, te recomendaremos a una especialista. No
              somos personal sanitario, y como tal tenemos nuestras limitaciones.
            </p>
            <p>Tampoco es para quien busca una solución en tres sesiones. Esto es constancia.</p>
            <p>
              Si vienes de un parto reciente, tu sitio es la página de{" "}
              <Link to="/posparto">recuperación posparto</Link>, que es un trabajo distinto. Y si estás embarazada,{" "}
              <Link to="/embarazo">esta otra</Link>.
            </p>
          </div>

          <div className="servicio-bloque">
            <h2>Preguntas frecuentes</h2>
            <div className="servicio-faq">
              {FAQ_SUELO_PELVICO.map((item) => (
                <div className="servicio-faq-item" key={item.pregunta}>
                  <h3>{item.pregunta}</h3>
                  <p>{item.respuesta}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="servicio-cierre">
            <p>
              La primera sesión es una valoración general para identificar tu estado: miramos cómo respiras, cómo
              activas y qué necesita tu caso. A partir de ahí trabajamos las debilidades que hayamos identificado.
              Cincuenta euros. Si después decides que no, no pasa nada.
            </p>
            <Link to="/reserva" className="btn-cta">
              Reservar tu primera clase
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PilatesSueloPelvico;
