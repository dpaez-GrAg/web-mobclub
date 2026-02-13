import React from "react";
import "./Contact.css";
import SectionLayout from "./SectionLayout";
import ContactCard from "./ContactCard";
import { Communication, CalendarThree, MessageSent, Local } from "@icon-park/react";
import backgroundImage from "../assets/backgrounds/bg_1.png";

const Contact = () => {
  return (
    <SectionLayout
      sectionId="contact"
      sectionClass="contact"
      h4Icon={<Communication size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />}
      h4Text="Contacto"
      h2Lines={["Ponte en contacto", "con nosotros"]}
      h2Delay={0.08}
      pText="Si todavía tienes dudas, puedes contactar de las siguientes maneras"
      backgroundImage={backgroundImage}
      backgroundFilter={{ grayscale: "90%", opacity: 0.3 }}
      section1Content={
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5800.829994710677!2d-8.405204!3d43.368346!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e7d6b2f3af5e9%3A0xe677c2d0347a6a9d!2sMobclub!5e0!3m2!1ses!2sus!4v1768837554269!5m2!1ses!2sus"
            width="100%"
            height="250"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de MOB Club - San Andrés 145, A Coruña"
          ></iframe>
        </div>
      }
      section2Content={
        <>
          <ContactCard
            icon={<CalendarThree size={24} />}
            title="Reserva online"
            description="Accede a nuestra app y gestiona tus reservas"
            buttonText="Acceder"
            buttonLink="/reserva"
          />

          <ContactCard
            icon={<MessageSent size={24} />}
            title="Contacta por WhatsApp"
            description="Envíanos tus dudas por WhatsApp"
            buttonText="WhatsApp"
            buttonLink="https://wa.me/34623769652"
          />

          <ContactCard
            icon={<Local size={24} />}
            title="Horario de apertura"
            description={
              <>
                De lunes a viernes de 7:00 a 22:00.
                <br />
                Sábados de 9:00 a 14:00
              </>
            }
            buttonText="Cómo llegar"
            buttonLink="https://maps.app.goo.gl/zkZqYTHs4hLPu3UL6"
          />
        </>
      }
    />
  );
};

export default Contact;
