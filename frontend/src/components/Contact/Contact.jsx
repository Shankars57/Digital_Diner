import React, { useRef } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";

import { useState } from "react";
const Contact = () => {
  const formRef = useRef(null);
  const svgRef = useRef(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_61eyju1", "template_7ofk82r", formRef.current, {
        publicKey: "TXN1gH5hEouwIyjVO",
      })
      .then(
        () => {
          setSuccess(true);
          setError(false);
          form.current.reset();
        },
        (error) => {
          setError(true);
          setSuccess(false);
        }
      );
  };

  return (
    <>
      <div className="contact-header" style={{ textAlign: "center" , fontSize:"2rem" }}>
        Contact Me
      </div>
      <div className="contact" id="contact">
        <div className="textContainer">
          <h1>Let's work together</h1>
          <div className="items">
            <h2>Mail</h2>
            <p>BonamGShankar@gmail.com</p>
          </div>
          <div className="items">
            <h2>Address</h2>
            <p>Peddapuram</p>
          </div>
          <div className="items">
            <h2>Contact</h2>
            <p>9110560147</p>
          </div>
        </div>

        <div className="formContainer">
          <form ref={formRef} onSubmit={sendEmail}>
            <input
              type="text"
              placeholder="Name"
              name="from_name"
              autoComplete="off"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="off"
              required
            />
            <textarea
              rows={5}
              placeholder="Message"
              name="message"
              autoComplete="off"
              required
            />
            <button type="submit">Submit</button>
            {error && <p style={{ color: "red" }}>Not Sent 😟</p>}
            {success && <p style={{ color: "green" }}>Success 👍🏻</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
