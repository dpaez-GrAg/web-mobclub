import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import { PRECIOS, FAQ_REFORMER } from "../routes.config";
import "./Servicio.css";

// Copy revisado por Diego en ARREGLO_VISIBILIDAD/copy/pilates-reformer-a-coruna.md,
// redactado a partir de las newsletters de Mobclub. El title, la description y el
// JSON-LD (Service + FAQPage) no están aquí: van en src/routes.config.js, que es
// de donde los coge <SEO> y de donde salen el sitemap y llms.txt.
//
// Las preguntas se pintan desde FAQ_REFORMER, la misma constante con la que se
// construye el FAQPage. Así no puede haber una FAQ marcada que no se vea.

const PilatesReformer = () => {
  const revealRef = useScrollReveal();

  return (
    <div className="servicio">
      <section className="servicio-intro reveal" ref={revealRef}>
        <div className="servicio-container">
          <h1>Pilates reformer, uno a uno, en A Coruña</h1>

          <p className="servicio-entradilla">
            Mobclub es un centro de A Coruña donde solo se hace una cosa: clases individuales de pilates reformer. Una
            profesora, una alumna, 50 minutos y un plan hecho para tu cuerpo. Cada clase se adapta a tus necesidades,
            específica para ti, tu estado y tu momento vital.
          </p>

          <div className="servicio-bloque">
            <h2>¿Qué es el pilates reformer?</h2>
            <p>
              Es pilates hecho sobre el reformer —una máquina de muelles, poleas y carro deslizante— en lugar de una
              esterilla en el suelo. También se le llama pilates con máquinas.
            </p>
            <p>Mismo ejercicio, diferentes enfoques para cada objetivo.</p>
            <p>Por eso funciona igual de bien a los 30 que a los 65.</p>
            <p>
              Trabajamos con el set completo de máquinas de pilates clásico. En cada clase pasarás por el reformer, el
              mat o el cadillac, y según lo que veamos usaremos el sistema que mejor te ayude a interiorizar el objetivo
              de esa sesión: silla wunda, baby chair, guillotine tower, electric chair, barrel…
            </p>
            <p>Todas las máquinas a disposición de tu clase, sin compartir.</p>
          </div>

          <div className="servicio-bloque">
            <h2>Una profesora, una alumna</h2>
            <p>En Mobclub no hay clases colectivas.</p>
            <p>
              Tradicionalmente se ha mezclado el yoga con el pilates, y el pilates con la fisioterapia, o con la danza.
              Aún hoy, la mayoría de centros ofrecen muchos servicios a la vez. Nada en contra: cada uno en su casa hace
              lo que quiere.
            </p>
            <p>Nosotros preferimos centrarnos y ser los mejores en lo nuestro.</p>
            <p>
              Mobclub nació como un centro de pilates en grupo. Cuando fuimos los mejores dando clases en grupo, pasamos
              al siguiente nivel: las clases individuales con máquinas, que es donde estamos ahora.
            </p>
            <p>Una disciplina al nivel de atletas de élite, al alcance de personas de la calle como tú y como yo.</p>
            <p>
              Nos especializamos en clases individuales y no hacemos otra cosa. Ya es bastante complicado ser
              especialista en una sola cosa como para intentar serlo en varias, y mucho tienen que estudiar nuestras
              profes solo con eso.
            </p>
            <p>
              No caemos en modas. Confiamos en nuestro método de trabajo. Hemos visto con nuestros propios ojos, durante
              todos estos años, las mejoras que desarrollan nuestros socios. También nos han avalado profesionales
              sanitarios de distintas ramas que han visto en sus pacientes, que acuden a nuestras clases, recuperaciones
              que no esperaban.
            </p>
          </div>

          <div className="servicio-bloque">
            <h2>Cómo es una sesión</h2>
            <p>Cincuenta minutos. Descalza.</p>
            <p>
              Nuestro método tiene como eje el trabajo de la musculatura del pie, y eso no se puede hacer metida en un
              zapato. Desde que nacemos metemos los pies en aparatos de tortura a presión que deforman la pisada y le
              quitan sensibilidad a una de las zonas del cuerpo con más terminaciones nerviosas. En clase los recuperas.
            </p>
            <p>De ahí para arriba: restaurar, alinear, centrar, corregir postura, liberar tensiones.</p>
            <p>
              No hay posturas de cara a la galería. No vas a ver una fila de gente intentando seguir a alguien que está
              delante. Se trabaja lo que tu cuerpo necesita ese día, que no es lo mismo en enero que en noviembre, ni la
              semana que duermes bien que la que no.
            </p>
            <p>
              Todas nuestras profesionales están en formación continua: damos formaciones internas y las evaluamos de
              forma recurrente para asegurarnos de que mantienen el nivel.
            </p>
          </div>

          <div className="servicio-bloque">
            <h2>Qué cuesta y qué horarios hay</h2>
            <p>
              Quince horarios de clase distintos cada día, de 7:00 a 22:00 de lunes a viernes, y los sábados por la
              mañana. Puedes cambiar tu clase hasta una hora antes de que empiece.
            </p>
            <table className="servicio-tabla">
              <thead>
                <tr>
                  <th scope="col">Modalidad</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>
                {PRECIOS.map((fila) => (
                  <tr key={fila.modalidad}>
                    <td>{fila.modalidad}</td>
                    <td>{fila.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              La suscripción es para quien quiere su hora reservada cada semana. El bono, para quien necesita
              flexibilidad total.
            </p>
            <p>
              La primera sesión son 50 €, y el precio es simbólico. Si te haces socia, bien. Y si no, también: te vas en
              cuanto acabe la clase y tan amigos.
            </p>
          </div>

          <div className="servicio-bloque">
            <h2>Para quién no es esto</h2>
            <p>No es para ti si buscas una clase colectiva barata. No la tenemos, y no vamos a tenerla.</p>
            <p>
              No es para ti si quieres entrenar sola a tu aire. Aquí hay una profesional encima de ti los 50 minutos,
              corrigiendo.
            </p>
            <p>
              Y no es para ti si esperas resultados sin volver. Esto funciona por acumulación: una clase suelta no cambia
              nada, y una rutina sostenida durante meses lo cambia casi todo.
            </p>
            <p>
              Si lo que quieres es un servicio especializado y de alto nivel, entonces sí. Y esperamos que seas una socia
              del mismo nivel, que necesitamos retos para estar a la altura.
            </p>
            <p>
              Si vienes de un embarazo o de un parto, empieza por <Link to="/embarazo">embarazo</Link> o por{" "}
              <Link to="/posparto">recuperación posparto</Link>. Y si lo que te preocupa son las pérdidas o la sensación
              de peso, mira el <Link to="/pilates-suelo-pelvico-a-coruna">trabajo de suelo pélvico</Link>.
            </p>
          </div>

          <div className="servicio-bloque">
            <h2>Preguntas frecuentes</h2>
            <div className="servicio-faq">
              {FAQ_REFORMER.map((item) => (
                <div className="servicio-faq-item" key={item.pregunta}>
                  <h3>{item.pregunta}</h3>
                  <p>{item.respuesta}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="servicio-cierre">
            <p>
              Reserva tu primera sesión y lo compruebas. Cincuenta euros, sin compromiso y sin discurso de venta al
              final.
            </p>
            <Link to="/reserva" className="btn-cta">
              Reservar la primera sesión
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PilatesReformer;
