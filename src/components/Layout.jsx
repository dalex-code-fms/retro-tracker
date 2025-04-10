import React from "react";
import "../styles/Layout.scss";
import { NavLink } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="arcade">
      <div className="arcade__screen-container">
        <div className="arcade__header">
          <div className="arcade__deco-grid">
            <div className="grid"></div>
            <div className="grid"></div>
            <div className="grid"></div>
            <div className="grid"></div>
            <div className="grid"></div>
            <div className="grid"></div>
          </div>
          <div className="arcade__logo">
            <NavLink to="/">
              <h1>GAMETRACKER</h1>
            </NavLink>
          </div>
          <div className="arcade__connexion">
            <button>Connexion</button>
          </div>
        </div>
        <div className="arcade__screen">{children}</div>
      </div>
      <div className="arcade__btn-container">
        <button className="arcade__btn push--flat"></button>
        <button className="arcade__btn push--flat"></button>
        <button className="arcade__btn push--flat"></button>
        <button className="arcade__btn push--flat"></button>
      </div>
    </div>
  );
};

export default Layout;
