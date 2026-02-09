import useScrollReveal from "../hooks/useScrollReveal";
import "./Confirmacion.css";

const Confirmacion = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <div className="confirmacion">
        <div className="confirmacion-container reveal" ref={revealRef}>
          <h1>🤚 ESPERA. QUEDA UNA COSA MÁS</h1>

          <h2>Para confirmar tu suscripción y que pueda enviarte lo que te prometí, debes hacer esto:</h2>

          <ul>
            <li>Vete a la bandeja de entrada de tu correo</li>
            <li>Abre el mail de MOBCLUB que acabas de recibir</li>
            <li>Haz clic en el enlace que tiene dentro y...</li>
            <li>Pasados unos minutos recibirás tu regalo</li>
          </ul>

          <h2>Si no recibes ese correo...</h2>

          <ul>
            <li>Comprueba la bandeja de no deseados, spam, promociones...</li>
            <li>Si has recibido el correo ahí, muévelo a la bandeja de entrada</li>
          </ul>

          <p className="confirmacion-footer-text">
            Si nada de esto lo soluciona, paciencia. Puede haber algún problema técnico que retrase el proceso.
            Escríbeme a <a href="mailto:info@mobclub.es">info@mobclub.es</a> y trataré de solucionarlo.
          </p>
        </div>
      </div>
    </>
  );
};

export default Confirmacion;
