import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import logoNegro from "../assets/logos/MOBCLUB_logo_negro.png";
import "./Nav.css";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && isMenuOpen) {
        closeMenu();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logoNegro} alt="MOBCLUB" className="nav-logo-img" />
          </Link>
        </div>

        <ul className="nav-menu-desktop">
          <li>
            <a href="#precios" onClick={(e) => smoothScrollTo(e, "precios", { navigate })}>
              Planes
            </a>
          </li>
          <li>
            <a href="#embarazo" onClick={(e) => smoothScrollTo(e, "embarazo", { navigate })}>
              Embarazo
            </a>
          </li>
          <li>
            <a href="#posparto" onClick={(e) => smoothScrollTo(e, "posparto", { navigate })}>
              Posparto
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => smoothScrollTo(e, "contact", { navigate })}>
              Contacto
            </a>
          </li>
        </ul>

        <Link to="/reserva" className="btn-cta nav-cta">
          Reserva tu clase
        </Link>

        <button
          className={`nav-hamburger ${isMenuOpen ? "nav-hamburger-open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <ul className={`nav-menu-mobile ${isMenuOpen ? "nav-menu-mobile-open" : ""}`}>
        <li>
          <a href="#precios" onClick={(e) => smoothScrollTo(e, "precios", { callback: closeMenu, navigate })}>
            Planes
          </a>
        </li>
        <li>
          <a href="#embarazo" onClick={(e) => smoothScrollTo(e, "embarazo", { callback: closeMenu, navigate })}>
            Embarazo
          </a>
        </li>
        <li>
          <a href="#posparto" onClick={(e) => smoothScrollTo(e, "posparto", { callback: closeMenu, navigate })}>
            Posparto
          </a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => smoothScrollTo(e, "contact", { callback: closeMenu, navigate })}>
            Contacto
          </a>
        </li>
        <li className="nav-last-element">
          <Link to="/reserva" className="btn-cta" onClick={closeMenu}>
            Reserva tu clase
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
