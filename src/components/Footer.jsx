import { Link, useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import logoNegro from "../assets/logos/MOBCLUB_logo_negro.png";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

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

        {isHome && (
          <nav className="footer-nav">
            <a href="#precios" onClick={(e) => smoothScrollTo(e, "precios", { navigate })}>
              Planes
            </a>
            <a href="#embarazo" onClick={(e) => smoothScrollTo(e, "embarazo", { navigate })}>
              Embarazo
            </a>
            <a href="#posparto" onClick={(e) => smoothScrollTo(e, "posparto", { navigate })}>
              Posparto
            </a>
            <a href="#contact" onClick={(e) => smoothScrollTo(e, "contact", { navigate })}>
              Contacto
            </a>
          </nav>
        )}
        <p className="footer-copyright">@{currentYear} MOBCLUB. Todos los derechos reservados.</p>
        <Link to="/legal">Legal</Link>
      </div>
    </footer>
  );
};

export default Footer;
