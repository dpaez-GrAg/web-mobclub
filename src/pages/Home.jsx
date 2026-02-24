import SEO from "../components/SEO";
import Hero from "../components/Hero";
import MethodSection from "../components/MethodSection";
import ReviewsSection from "../components/ReviewsSection";
import EmbarazoSection from "../components/EmbarazoSection";
import PospartoSection from "../components/PospartoSection";
import PricingSection from "../components/PricingSection";
import ScheduleSection from "../components/ScheduleSection";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <>
      <SEO
        title="Mobclub | Pilates máquinas en A Coruña"
        description="Clases individuales de pilates con máquinas para mejorar tu cuerpo con planificación, respeto y atención personalizada. Centro premium en A Coruña."
        ogTitle="Si tu cuerpo está bien, tu vida funciona mejor"
        ogDescription="Clases individuales de pilates con máquinas. Criterio, planificación y atención personal para cuidar tu cuerpo de verdad."
        path="/"
      />
      <Hero />
      <MethodSection />
      <ReviewsSection />
      <PricingSection />
      <ScheduleSection />
      <EmbarazoSection />
      <PospartoSection />
      <Contact />
    </>
  );
};

export default Home;
