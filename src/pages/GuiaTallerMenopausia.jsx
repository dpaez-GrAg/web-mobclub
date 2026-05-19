import { useEffect } from "react";
import SEO from "../components/SEO";
import useScrollReveal from "../hooks/useScrollReveal";
import coverImage from "../assets/images/coverguiamenopausia.jpg";
import "./GuiaTallerMenopausia.css";

const GuiaTallerMenopausia = () => {
  const revealRef = useScrollReveal();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="guia-taller-menopausia-page">
      <SEO
        title="Guía Taller Menopausia | Mobclub A Coruña"
        description="Entiende el cambio en tu cuerpo, no luches contra él. Guía de 21 páginas con todo lo que necesitas saber sobre la menopausia y cómo afrontarla."
        ogTitle="Entiende el cambio en tu cuerpo, no luches contra él"
        ogDescription="Un manual de 21 páginas donde entenderás exactamente qué está pasando en tu cuerpo y qué hacer al respecto. Herramientas y soluciones reales respaldadas por profesionales."
        path="/guiatallermenopausia"
      />

      <section className="guia-intro reveal" ref={revealRef}>
        <div className="guia-intro-container">
          <h3>¿Qué está pasando en mi cuerpo?</h3>

          <h1>Entiende el cambio en tu cuerpo, no luches contra él.</h1>

          <p>Es natural. Es irremediable.</p>
          <p>Mirar para otro lado no va a evitar que pases por ello.</p>
          <p>No se puede ir a la guerra con un tenedor.</p>
          <p>A ver, poderse se puede. Pero te puedes imaginar el resultado.</p>

          <p>
            A partir de los 40 se van a ir produciendo cambios en tu cuerpo. <br />
            No son repentinos. No te vas a levantar un día siendo distinta a ayer. <br />
            Pero si no los afrontas, habrá un día que te mires al espejo y no te reconozcas.
          </p>

          <p>
            La menopausia no es una enfermedad. <br />
            Es un proceso fisiológico que sucede en la vida de todas las mujeres. <br />
            Que provoca cambios. Y esos cambios, si no los controlas, pueden hacer mella.
          </p>

          <h3>Es mejor controlar lo que te pasa, que sufrir las consecuencias.</h3>

          <p>Los síntomas ya los conoces. Están en boca de todos.</p>
          <p>Qué hacer o cómo afrontarlos, no tanto.</p>

          <p>
            Hay muchos estudios de suplementos y superalimentos mágicos. Pero gran parte de ellos han sido financiados
            por la marca que los vende. Te puedes imaginar la imparcialidad de ellos.
          </p>
          <p>Tenemos acceso a toda la información del mundo, pero no sabemos si es verídica.</p>

          <p>
            Por suerte hemos elaborado esta guía. Un manual que sintetiza toda la información que necesitas tener
            alrededor de esta etapa.
          </p>

          <p>
            Desde la explicación (y la solución) de por qué tu cuerpo está acumulando más grasa abdominal, pasando por
            la fatiga o falta de energía, el por qué ya no tienes ese deseo sexual, o por qué de repente es imposible
            conciliar el sueño.
          </p>

          <p>Todo eso condensado, explicado para que lo entienda todo el mundo.</p>

          <div className="guia-cover-wrapper">
            <img src={coverImage} alt="Portada de la guía de menopausia" className="guia-cover-image" />
          </div>

          <p>
            Un manual de 21 páginas donde entenderás exactamente que está pasando en tu cuerpo y qué hacer al respecto.
          </p>

          <p>En está guía descubrirás:</p>

          <ul>
            <li>
              La lista de los suplementos que funcionan de verdad, los que pueden funcionar en tu caso, y los que son un
              invento de marketing.
            </li>
            <li>
              Los tres factores que aumentan un 30% las posibilidades de ansiedad o depresión en esta etapa (y cómo
              evitarlos).
            </li>
            <li>
              30 recetas sencillas para desayunos, comidas, cenas y snacks elaborado por la experta en nutrición que no
              te cansarás de comer.
            </li>
            <li>La razón por la que debes (o no) tomar melatonina para el sueño.</li>
            <li>Las tres técnicas de gestionar el estrés que encajan contigo.</li>
            <li>Dos cosas que no debes comer si quieres dormir de manera profunda.</li>
            <li>El gran aliado y uno de los pilates más importantes en esta etapa.</li>
            <li>Cómo gestionar la vitamina D en tu caso.</li>
            <li>Un uso diferente del azafrán, además del arroz.</li>
            <li>Cómo mejorar el tránsito intestinal, especialmente en esta etapa.</li>
            <li>Cuáles son los mejores pescados para la salud cardiovascular.</li>
          </ul>

          <p>
            No es que lo estés haciendo peor. Es que tu cuerpo te está pidiendo unas cosas que no estás sabiendo
            interpretar.
          </p>
          <p>Necesitas otro enfoque.</p>

          <p>
            El taller donde compartimos toda esta información costaba 50€. <br />
            Las asistentes salieron preguntando cuándo se organizaba el siguiente.
          </p>

          <p>
            Hoy te puedes llevar el contenido exacto, estructurado y accionable paso a paso, listo para descargar y
            consultar siempre que quieras.
          </p>

          <h3>Por solo 20 euros.</h3>

          <p>
            Menos de lo que te cuesta un bote de pastillas que prometen el remedio mágico contra todos los síntomas, a
            la vez.
          </p>
          <p>Te adelanto que, con este documento, te vas a ahorrar el comprar todo eso.</p>
          <p>Esta guía recoge herramientas, estudios y soluciones reales respaldadas por profesionales.</p>

          <div className="guia-stripe">
            <stripe-buy-button
              buy-button-id="buy_btn_1TYhHyLvNe4RargKhNtBuTyB"
              publishable-key="pk_live_51NrgEILvNe4RargKlBEd3vMhTitnszfM3HLXbc0p0CI2DJ5KwaWL31IYAMpR3w5P5PypRWgumJX7enggOv1Bmm5i003rznk5rf"
            />
          </div>

          <p>Pd.1: Estará disponible hasta el viernes.</p>
          <p>Pd.2: El acceso es inmediato. Lo compras, lo recibes en tu mail para siempre.</p>
        </div>
      </section>
    </div>
  );
};

export default GuiaTallerMenopausia;
