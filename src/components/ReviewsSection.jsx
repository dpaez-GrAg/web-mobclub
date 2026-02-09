import React from "react";
import { Like } from "@icon-park/react";
import TypewriterText from "./TypewriterText";
import avatarAsun from "../assets/images/retratos/RP1_asun.jpeg";
import avatarAmelia from "../assets/images/retratos/RP2_amelia.jpeg";
import avatarIvana from "../assets/images/retratos/RP3_ivana.jpeg";
import avatarNuria from "../assets/images/retratos/RP4_nuria.jpeg";
import avatarIria from "../assets/images/retratos/RP5_iria.jpeg";
import avatarJulia from "../assets/images/retratos/RP6_julia.jpeg";
import "./ReviewsSection.css";

const reviews = [
  {
    text: "No puedo estar más contenta! Ya había probado el pilates antes, pero este método ha sido un descubrimiento total para mí.",
    name: "Asun, 40",
    avatar: avatarAsun,
  },
  {
    text: "Llevo 2 meses entrenando aquí y me encanta. Soy nueva en el mundo del pilates y ya voy notando los avances. Todas las chicas son súper amables y me hacen sentir muy cómoda.",
    name: "Iria, 53",
    avatar: avatarIria,
  },
  {
    text: "Qué maravilla de sitio! Desde que entras hasta que te bajas de la nube en la que sales tras la clase, es todo una experiencia. Un espacio que transmite paz y tranquilidad. Unas chicas encantadoras que hacen que la visita no quede en el olvido. Todo impecable y con mil detalles para hacer que desconectes y te sientas en un sitio con nivel, exclusivo, distinto pero acogedor al máximo.",
    name: "Nuria, 27",
    avatar: avatarNuria,
  },
  {
    text: "Un lugar para descubrirte, evolucionar y sentir lo que deberíamos todos los días… una experiencia increíble… además de las clases privadas de pilates;",
    name: "Ivana, 38",
    avatar: avatarIvana,
  },
  {
    text: "El local es precioso, las entrenadoras super profesionales y el entrenamiento completo y personalizado. Pilates premium.",
    name: "Amelia, 45",
    avatar: avatarAmelia,
  },
  {
    text: "He tardado mucho tiempo en escribir la reseña de este sitio desde que soy usuaria y creo que fue porque no encontraba la palabra adecuada para definirlo. SUBLIME es la palabra. ¿No creéis que la música, de no existir, habría que inventarla? Pues a mí eso me pasa también con Mobclub: de no existir, habría que inventarlo.",
    name: "Julia, 56",
    avatar: avatarJulia,
  },
];

const ReviewsSection = () => {
  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <h4>
            <Like size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
            Reseñas
          </h4>
          <TypewriterText
            lines={["Y esto es lo que nuestros", "socios dicen de nosotros"]}
            as="h2"
            delay={0.08}
            triggerOnScroll={true}
          />
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <img className="review-avatar" src={review.avatar} alt={review.name} />
                <span className="review-name">— {review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
