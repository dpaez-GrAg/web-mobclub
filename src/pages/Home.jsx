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
