import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`navbar ${sticky ? "sticky" : ""}`}>
      <div>
        {" "}
        <Link to="/"> Digital-Diner🍽️</Link>
      </div>
      <ul className="navbar-menu">
        <li>
          {" "}
          <a
            href="#header"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </a>
        </li>
        <li>
          {" "}
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          {" "}
          <a
            href="#about"
            onClick={() => setMenu("about")}
            className={menu === "about" ? "active" : ""}
          >
            About
          </a>
        </li>
        <li>
          {" "}
          <a
            href="#contact"
            onClick={() => setMenu("contactUs")}
            className={menu === "contactUs" ? "active" : ""}
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="navbar-right">
      <div className="nav-orders"><Link to="/order-history">History</Link></div>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)} type="button">
          sign in
        </button>
      </div>
    </div>
  );
};

export default NavBar;
