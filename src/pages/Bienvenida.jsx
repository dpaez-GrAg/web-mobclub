import useScrollReveal from "../hooks/useScrollReveal";
import "./Bienvenida.css";

const Bienvenida = () => {
  const revealRef = useScrollReveal();

  return (
    <div className="bienvenida">
      <div className="bienvenida-container reveal" ref={revealRef}>
        <h1>🖐️ AHORA SÍ. YA LO HAS HECHO OFICIAL</h1>

        <p>Ahora que has completado todos los pasos, recibirás lo prometido.</p>

        <ul>
          <li>Ve a tu bandeja de entrada</li>
          <li>Si no ves el correo, revisa en la bandeja spam</li>
          <li>Si por error he entrado en el sitio equivocado, muéveme a la bandeja de entrada</li>
        </ul>

        <p className="bienvenida-footer-text">
          Y si tienes alguna duda, te escucho en <a href="mailto:info@mobclub.es">info@mobclub.es</a>
        </p>
      </div>
    </div>
  );
};

export default Bienvenida;
