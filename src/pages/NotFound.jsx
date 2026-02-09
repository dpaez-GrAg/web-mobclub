import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-container">
        <h1>La página que buscas no existe.</h1>

        <Link to="/" className="btn-cta">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
