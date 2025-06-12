import React, { useState, useContext, useEffect } from "react";
import "../../styles/login.css";
import { assets } from "../../assets/assets";
import { contextParse } from "../../context/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const { setToken, token } = useContext(contextParse);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...data,
      email: data.email.trim(),
      password: data.password.trim(),
      ...(mode === "signup" && { name: data.name.trim() }),
    };

    const endpoint =
      mode === "login"
        ? "https://digital-diner-assignment.onrender.com/api/users/login"
        : "https://digital-diner-assignment.onrender.com/api/users/register";

    try {
      setLoading(true);
      const res = await axios.post(endpoint, submitData);
      if (res.data.success) {
        toast.success(res.data.message, { autoClose: 1000 });
        localStorage.setItem("tokened", res.data.token);
        setToken(res.data.token);
        setShowLogin(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("tokened");
    setShowLogin(false);
    toast.success("Logout successful");
  };
  const isLoggedIn = Boolean(token);

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
          <img
            src={assets.cross_icon}
            alt="Close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-inputs">
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Create Account"
            : "Login"}
        </button>

        {mode === "signup" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
          </div>
        )}

        <p>
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span onClick={() => setMode(mode === "login" ? "signup" : "login")}>
            {mode === "login" ? " Sign up here." : " Login here."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopUp;
