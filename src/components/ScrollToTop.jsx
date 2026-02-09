import { useState, useEffect } from "react";
import { UpC } from "@icon-park/react";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const nav = document.querySelector(".nav");

    const handleScroll = () => {
      if (!nav) return;

      const navRect = nav.getBoundingClientRect();
      const navIsVisible = navRect.bottom > 0;

      setIsVisible(!navIsVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? "scroll-to-top-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      <UpC theme="outline" size="32" fill="#333" strokeWidth={2} />
    </button>
  );
};

export default ScrollToTop;
