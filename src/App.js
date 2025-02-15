// src/App.js
import React from "react";
import Deck from "./components/Deck";
import "./styles.css";

const App = () => {
  return (
    <div className="app">
      <h1>ReactJS Deck of Cards</h1>
      <Deck />
    </div>
  );
};

export default App;
