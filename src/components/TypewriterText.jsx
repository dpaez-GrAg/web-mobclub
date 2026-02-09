import { useState, useEffect, useRef } from "react";
import "./TypewriterText.css";

const TypewriterText = ({ lines = [], as: Tag = "h1", delay = 0.12, triggerOnScroll = false }) => {
  const [isVisible, setIsVisible] = useState(!triggerOnScroll);
  const ref = useRef(null);
  let wordIndex = 0;

  useEffect(() => {
    if (!triggerOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [triggerOnScroll]);

  return (
    <Tag ref={ref} className="typewriter">
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="typewriter-line">
          {line.split(" ").map((word) => {
            const currentDelay = wordIndex * delay;
            wordIndex++;

            return (
              <span
                key={wordIndex}
                className={`typewriter-word ${isVisible ? "typewriter-word-visible" : ""}`}
                style={{ animationDelay: `${currentDelay}s` }}
              >
                {word}&nbsp;
              </span>
            );
          })}
          <br />
        </span>
      ))}
    </Tag>
  );
};

export default TypewriterText;
