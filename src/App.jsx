import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import SEO from "./components/SEO";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import Empleo from "./pages/Empleo";
import Confirmacion from "./pages/Confirmacion";
import Bienvenida from "./pages/Bienvenida";
import NotFound from "./pages/NotFound";
import Embarazo from "./pages/Embarazo";
import Posparto from "./pages/Posparto";
import Reserva from "./pages/Reserva";
import PilatesReformer from "./pages/PilatesReformer";
import PilatesSueloPelvico from "./pages/PilatesSueloPelvico";
import TallerAlimentacionMenopausia from "./pages/TallerAlimentacionMenopausia";
import GuiaTallerMenopausia from "./pages/GuiaTallerMenopausia";
import ConfirmacionTaller from "./pages/ConfirmacionTaller";
import ConfirmacionGuiaTaller from "./pages/ConfirmacionGuiaTaller";
import PageTransition from "./components/PageTransition";
import Footer from "./components/Footer";
import { routes as routesConfig, breadcrumbFor } from "./routes.config";
import "./styles/global.css";

// Las rutas NO se declaran aquí: se declaran en src/routes.config.js, que es la
// única fuente y de la que también comen scripts/prerender.mjs,
// scripts/gen-sitemap.mjs y scripts/gen-llms-txt.mjs. Aquí solo se dice qué
// componente pinta cada una.

// Registro id → componente de página. Añadir una página = una entrada en
// routes.config.js + una entrada aquí.
const PAGES = {
  home: <Home />,
  embarazo: <Embarazo />,
  posparto: <Posparto />,
  reserva: <Reserva />,
  pilatesReformer: <PilatesReformer />,
  pilatesSueloPelvico: <PilatesSueloPelvico />,
  tallerAlimentacionMenopausia: <TallerAlimentacionMenopausia />,
  guiaTallerMenopausia: <GuiaTallerMenopausia />,
  empleo: <Empleo />,
  legal: <Legal />,
  confirmacion: <Confirmacion />,
  bienvenida: <Bienvenida />,
  confirmacionTaller: <ConfirmacionTaller />,
  confirmacionGuiaTaller: <ConfirmacionGuiaTaller />,
  notFound: <NotFound />,
};

function AppContent() {
  const location = useLocation();

  // El Nav se muestra según el flag `nav` de la ruta. Una URL que no existe no
  // lo lleva, igual que antes: lo decidía una comparación contra una lista de
  // paths escrita a mano dentro de este mismo fichero.
  const rutaActual = routesConfig.find((route) => route.path === location.pathname);
  const showNav = rutaActual ? rutaActual.nav !== false : false;

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
          {routesConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  <SEO
                    path={route.path}
                    title={route.title}
                    description={route.description}
                    ogTitle={route.ogTitle}
                    ogDescription={route.ogDescription}
                    noindex={!route.indexable}
                    breadcrumb={breadcrumbFor(route)}
                    schema={route.schema}
                  />
                  {PAGES[route.id]}
                </>
              }
            />
          ))}
          {/* Comodín para la navegación dentro de la SPA. No está en
              routes.config.js a propósito: no es una URL, no va al sitemap y el
              prerender no emite fichero para él. Quien aterriza de fuera en una
              URL inexistente recibe el dist/404.html que genera la ruta /404. */}
          <Route
            path="*"
            element={
              <>
                <SEO path="/404" title="Página no encontrada | Mobclub" noindex />
                <NotFound />
              </>
            }
          />
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
