import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Time, Ticket, CornerDownRight, Plan } from "@icon-park/react";
import TypewriterText from "./TypewriterText";
import peopleBono from "../assets/images/PEOPLE_8byn.jpeg";
import peopleSub from "../assets/images/PEOPLE_4byn.jpeg";
import "./PricingSection.css";

const tabs = [
  { id: "suscripcion", label: "Suscripción", icon: <Time size={18} /> },
  { id: "bonos", label: "Bono de clases", icon: <Ticket size={18} /> },
];

const pricingData = {
  suscripcion: {
    image: peopleSub,
    title: "Suscripción",
    subtitle: "Tu sesión confirmada cada semana",
    prices: [
      { amount: "180 €", description: "Una sesión a la semana" },
      { amount: "340 €", description: "Dos sesiones a la semana" },
      { amount: "500 €", description: "Tres sesiones a la semana" },
    ],
  },
  bonos: {
    image: peopleBono,
    title: "Bono de Clases",
    subtitle: "Flexibilidad total para reservar",
    prices: [
      { amount: "50 €", description: "Una sesión" },
      { amount: "200 €", description: "Cinco sesiones" },
      { amount: "350 €", description: "Diez sesiones" },
    ],
  },
};

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState("suscripcion");
  const data = pricingData[activeTab];
  return (
    <section className="pricing-section" id="precios">
      <div className="pricing-container">
        <div className="pricing-header">
          <h4>
            <Plan size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
            Precios
          </h4>
          <TypewriterText
            lines={["Tú eliges el plan que mejor se adapta a ti"]}
            as="h2"
            delay={0.08}
            triggerOnScroll={true}
          />
          <p>
            Tanto si tienes una rutina que te permite acudir a clase con regularidad, como si necesitas flexibilidad
            total, en Mobclub tenemos el plan perfecto para ti.
          </p>
        </div>

        <div className="pricing-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pricing-tab ${activeTab === tab.id ? "pricing-tab-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pricing-content" key={activeTab}>
          <div className="pricing-image">
            <img src={data.image} alt={data.title} />
          </div>

          <div className="pricing-card">
            <h3>{data.title}</h3>
            <p className="pricing-card-subtitle">{data.subtitle}</p>

            <ul className="pricing-list">
              {data.prices.map((item, index) => (
                <li key={index} className="pricing-item">
                  <span className="pricing-amount">{item.amount}</span>
                  <span className="pricing-description">{item.description}</span>
                </li>
              ))}
            </ul>

            <Link to="/reserva" className="btn-action">
              <CornerDownRight size={16} className="btn-action-icon" />
              Reservar
            </Link>
          </div>
        </div>
        <div className="pricing-footer">
          <h3>Horario</h3>
          <p>
            Lunes a viernes de 7:00 a 22:00
            <br />
            Sábado de 9:00 a 14:00
          </p>
          <p>Clases cada hora</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
