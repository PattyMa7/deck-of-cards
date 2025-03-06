import React from "react";
import "../styles.css";

const Card = ({ suit, value, onClick, isSelected }) => {
  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <span className="card-value">{value}</span>
      <span className="card-suit">{suit}</span>
    </div>
  );
};

export default Card;