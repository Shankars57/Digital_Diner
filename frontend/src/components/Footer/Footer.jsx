import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} The Digital Diner. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
