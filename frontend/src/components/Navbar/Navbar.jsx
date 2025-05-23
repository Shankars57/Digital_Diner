import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { contextParse } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
const NavBar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(contextParse);
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("tokened");
    setShowLogin(false);
    toast.success("Logout successful");
    navigate("/");
  };

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
  const isLoggedIn = Boolean(token);
  return (
    <div className={`navbar ${sticky ? "sticky" : ""}`}>
      <div className="siteName">
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
        <div className="nav-orders">
          <Link to="/order-history" title="History">
            History
          </Link>
        </div>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img title="cart" src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        {isLoggedIn ? (
          <div className="nav-orders">
            <button onClick={handleLogout} title="Logout">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} type="button">
            sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
