import { Link, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import logoNegro from "../assets/logos/MOBCLUB_logo_negro.png";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logoNegro} alt="MOBCLUB" className="footer-logo-img" onClick={scrollToTop} />
        </div>

        <nav className="footer-nav">
          <a href="/#precios" onClick={(e) => smoothScrollTo(e, "precios", { navigate })}>
            Planes
          </a>
          <Link to="/pilates-reformer-a-coruna">Reformer</Link>
          <Link to="/pilates-suelo-pelvico-a-coruna">Suelo pélvico</Link>
          <a href="/#embarazo" onClick={(e) => smoothScrollTo(e, "embarazo", { navigate })}>
            Embarazo
          </a>
          <a href="/#posparto" onClick={(e) => smoothScrollTo(e, "posparto", { navigate })}>
            Posparto
          </a>
          <a href="/#contact" onClick={(e) => smoothScrollTo(e, "contact", { navigate })}>
            Contacto
          </a>
        </nav>
        <p className="footer-copyright">@{currentYear} MOBCLUB. Todos los derechos reservados.</p>
        <Link to="/legal">Legal</Link>
      </div>
    </footer>
  );
};

export default Footer;
