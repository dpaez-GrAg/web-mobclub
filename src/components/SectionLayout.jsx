import React from "react";
import TypewriterText from "./TypewriterText";
import "./SectionLayout.css";

const SectionLayout = ({
  sectionId,
  sectionClass = "",
  h4Icon,
  h4Text,
  h2Lines,
  h2Delay = 0.08,
  pText,
  section1Content,
  section2Content,
  backgroundImage,
  backgroundFilter = { grayscale: "0%", opacity: 1 },
}) => {
  return (
    <section
      className={`section-layout ${sectionClass}`}
      id={sectionId}
      style={
        backgroundImage
          ? {
              "--bg-image": `url(${backgroundImage})`,
              "--bg-grayscale": backgroundFilter.grayscale || "0%",
              "--bg-opacity": backgroundFilter.opacity || 1,
            }
          : {}
      }
    >
      <div className="section-container">
        <div className="section-column-1">
          <div className="section-header">
            <h4>
              {h4Icon}
              {h4Text}
            </h4>
            <TypewriterText lines={h2Lines} as="h2" delay={h2Delay} triggerOnScroll={true} />
            <p>{pText}</p>
          </div>
          {section1Content}
        </div>

        <div className="section-column-2">{section2Content}</div>
      </div>
    </section>
  );
};

export default SectionLayout;
