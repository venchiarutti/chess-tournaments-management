import React from "react";
import "./index.css";

export const Card = ({ title, children }) => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__header__title">{title}</div>
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
};
