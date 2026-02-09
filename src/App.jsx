import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import Confirmacion from "./pages/Confirmacion";
import Bienvenida from "./pages/Bienvenida";
import NotFound from "./pages/NotFound";
import Embarazo from "./pages/Embarazo";
import Posparto from "./pages/Posparto";
import Reserva from "./pages/Reserva";
import PageTransition from "./components/PageTransition";
import Footer from "./components/Footer";
import "./styles/global.css";

function AppContent() {
  const location = useLocation();
  const validPaths = ["/", "/legal", "/confirmacion", "/bienvenida", "/embarazo", "/posparto", "/reserva"];
  const showNav =
    validPaths.includes(location.pathname) || !validPaths.some((path) => location.pathname.startsWith(path));

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="app-layout">
      {showNav && <Nav />}
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/embarazo" element={<Embarazo />} />
          <Route path="/posparto" element={<Posparto />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
