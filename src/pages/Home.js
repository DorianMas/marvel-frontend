import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import bannerPicture from "../assets/banner-effect.jpg";

const Home = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-first-section">
        <div className="homepage-left-first-section">
          {" "}
          <h1>Explore the Marvel World</h1>
          <p>
            The Marvel's vast library of comics—from what's coming up, to 70
            years ago.
          </p>
          <Link to="/user/signup">
            {" "}
            <button className="subscribe-button">
              Subscribe
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>{" "}
          </Link>
        </div>
        <div className="homepage-right-first-section">
          <img src={bannerPicture} />
        </div>
      </div>
      <div className="homepage-second-section">
        <div className="homepage-left-second-section">
          <h2>Over 47.000 comics </h2>
          <p>Find all the Marvel comics since the 70's</p>
        </div>
        <div className="homepage-right-second-section">
          <Link to="/characters">
            {" "}
            <button>Explore</button>
          </Link>
        </div>
      </div>
      <div className="homepage-third-section">
        <div className="homepage-left-third-section">
          <Link to="/comics">
            {" "}
            <button>Explore</button>
          </Link>
        </div>
        <div className="homepage-right-third-section">
          <h2>More than 1.000 characters</h2>
          <p>All your favorite heroes in one click</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
