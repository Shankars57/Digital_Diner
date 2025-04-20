import React, { useState } from "react";
import "../../styles/login.css";
import { assets } from "../../assets/assets";
const LoginPopUp = (props) => {
  const [current, setCurrent] = useState("Login");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{current}</h2>
          <img
            onClick={() => props.setShowLogin(false)}
            src={assets.cross_icon}
            alt="cross_icon"
          />
        </div>
        <div className="login-popup-inputs">
          {current === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="password" required />
        </div>
        <button>{current === "sign up" ? "create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing , I agree to the term of use & privacy policy.</p>
        </div>
        {current === "Login" ? (
          <p>
            create a new account?
            <span onClick={() => setCurrent("sign up")}>Click Here.</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrent("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
