import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { MedicalFiles } from "@icon-park/react";
import SectionLayout from "./SectionLayout";
import brandImage from "../assets/images/BRAND_02.jpg";
import backgroundImage from "../assets/backgrounds/bg_3.png";
import "./MethodSection.css";

const MethodSection = () => {
  const cardsRef = useScrollReveal();

  return (
    <SectionLayout
      sectionId="metodo"
      sectionClass="method"
      backgroundImage={backgroundImage}
      backgroundFilter={{ grayscale: "90%", opacity: 0.3 }}
      h4Icon={<MedicalFiles size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />}
      h4Text="Método"
      h2Lines={["Ok, muy bien la teoría pero,", "¿cómo debería ser la práctica?"]}
      h2Delay={0.08}
      pText="Esto es lo que encontrarás aquí."
      section1Content={
        <div className="method-image">
          <img src={brandImage} alt="Mobclub método" />
        </div>
      }
      section2Content={
        <div className="method-cards stagger-grid" ref={cardsRef}>
          <div className="method-card" style={{ "--stagger-index": 0 }}>
            <h3>Entrenamiento personalizado</h3>
            <p>Que se adapta a tus condiciones, y no al revés.</p>
          </div>

          <div className="method-card" style={{ "--stagger-index": 1 }}>
            <h3>Sin posturas de cara a la galería</h3>
            <p>
              No harás posturas bonitas de cara a la galería.
              <br />
              Iremos a lo práctico y que da resultados.
            </p>
          </div>

          <div className="method-card" style={{ "--stagger-index": 2 }}>
            <h3>Planificación con objetivos</h3>
            <p>Trabajando con planificación, para personas que quieran conseguir objetivos, no hacer por hacer.</p>
          </div>

          <div className="method-card" style={{ "--stagger-index": 3 }}>
            <h3>Eficiente con tu tiempo</h3>
            <p>
              No necesitas hacer un millón de ejercicios.
              <br />
              Ni pasarte dos horas al día en el gimnasio.
            </p>
          </div>
        </div>
      }
    />
  );
};

export default MethodSection;
