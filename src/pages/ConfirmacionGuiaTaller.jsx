import useScrollReveal from "../hooks/useScrollReveal";
import "./ConfirmacionGuiaTaller.css";

const ConfirmacionGuiaTaller = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <div className="confirmacion-guia-taller">
        <div className="confirmacion-guia-taller-container reveal" ref={revealRef}>
          <h1>👏 TU COMPRA ESTÁ FINALIZADA</h1>

          <p>No tienes que hacer nada más. Bueno, si, aplicar todo lo que vas a encontrarte en esta guía.</p>
          <p>Pero eso ya es cosa tuya.</p>

          <h2>En unos minutos recibirás un email con el enlace de acceso a la guía.</h2>

          <p>Puedes descargarlo, guardarlo en favoritos o lo que sea más cómodo para tenerlo siempre a mano.</p>

          <h2>Si no recibes ese correo…</h2>

          <ul>
            <li>Comprueba la bandeja de no deseados, spam, promociones...</li>
            <li>Si has recibido el correo ahí, muévelo a la bandeja de entrada</li>
          </ul>

          <p className="confirmacion-guia-taller-footer-text">
            Si nada de esto lo soluciona, paciencia. Puede haber algún problema técnico que retrase el proceso.
            Escríbeme a <a href="mailto:info@mobclub.es">info@mobclub.es</a> y trataré de solucionarlo.
          </p>
        </div>
      </div>
    </>
  );
};

export default ConfirmacionGuiaTaller;
