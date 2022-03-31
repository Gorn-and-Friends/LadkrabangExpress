import React from "react";
import "../../assets/styles/Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading__content">
          <div className="loading__track" />
          <div className="loading__train">
            <div className="loading__front" />
            <div className="loading__wheels">
              <div className="loading__wheels__small-1" />
              <div className="loading__wheels__small-2" />
              <div className="loading__wheels__small-3" />
              <div className="loading__wheels__small-4" />
              <div className="loading__wheels__small-5" />
              <div className="loading__wheels__small-6" />
              <span className="loading__wheels__big" />
            </div>
            <div className="loading__cord" />
            <div className="loading__coach" />
            <div className="loading__coach-2" />
            <div className="loading__windows" />
            <div id="up" className="loading__steam" />
            <div id="up" className="loading__steam-2" />
            <div id="up" className="loading__steam-3"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
