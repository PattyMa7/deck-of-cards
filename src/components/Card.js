// src/components/Card.js
import React from "react";
import "../styles.css";

const Card = ({ suit, value, onClick, isSelected }) => {
  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {value} {suit}
    </div>
  );
};

export default Card;
