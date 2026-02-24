import React from "react";
import { BigClock } from "@icon-park/react";
import TypewriterText from "./TypewriterText";
import "./ScheduleSection.css";

const ScheduleSection = () => {
  return (
    <section className="schedule-section" id="horarios">
      <div className="schedule-container">
        <div className="schedule-header">
          <h4>
            <BigClock size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
            Horarios
          </h4>
          <TypewriterText
            lines={["Quince horarios de clase diferentes cada día"]}
            as="h2"
            delay={0.08}
            triggerOnScroll={true}
          />
          <p>
            Mobclub abre a las 7am y cierra a las 22pm. <br />
            De lunes a viernes. <br />
            Sábados por la mañana.
          </p>
          <p>
            Cada hora en punto empieza una clase. <br />
            El centro con más clases de toda la ciudad.
          </p>
          <p>
            A las 7:00, a las 8:00, a las 9:00, a las 10:00, a las 11:00, a las 12:00... y así hasta las 21:00 que
            empieza nuestra última clase del día.
          </p>
          <p>
            Si con este horario no sacas tiempo de venir a una, aunque sólo sea una clase a la semana, el problema no lo
            tengo yo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
