import React from "react";
import { Link } from "react-router-dom";
import { CornerDownRight } from "@icon-park/react";

const ContactCard = ({ icon, title, description, buttonText, buttonLink }) => {
  const isInternal = buttonLink.startsWith("/");
  return (
    <div className="contact-card">
      <div className="contact-card-icon">{icon}</div>
      <h3 className="contact-card-title">{title}</h3>
      <p className="contact-card-text">{description}</p>
      {isInternal ? (
        <Link to={buttonLink} className="btn-action">
          <CornerDownRight size={16} className="btn-action-icon" />
          {buttonText}
        </Link>
      ) : (
        <a href={buttonLink} target="_blank" rel="noopener noreferrer" className="btn-action">
          <CornerDownRight size={16} className="btn-action-icon" />
          {buttonText}
        </a>
      )}
    </div>
  );
};

export default ContactCard;
