import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

const OrderHistory = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const [loader, setLoader] = useState(false);

  const fetchOrders = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `https://digital-diner-assignment.onrender.com/api/orders/${phoneNumber}`
      );

      console.log(res);

      if (Array.isArray(res.data)) {
        setOrders(res.data);
        setError(null); // Clear any previous error
      } else {
        setError("No orders found for this phone number.");
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError(
        "Could not load order history maybe please check your mobile number."
      );
      setOrders([]);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="order-history">
      <h2>Your Order History</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={fetchOrders}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loader && <div className="loader-container">Loading...</div>}

      {orders.length === 0 && !error ? (
        <p>
          {!loader
            ? "Please enter your phone number for the order history details."
            : ""}
        </p>
      ) : (
        <div className="order-items">
          <div className="order-items-header">
            <p>Name</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <hr />
          {orders.map((order, index) => (
            <div key={index}>
              <h4>Order #{index + 1}</h4>
              {order.items.map((item, idx) => (
                <div key={idx} className="order-items-row">
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  <p>${item.price}</p>
                  <p>${item.quantity * item.price}</p>
                </div>
              ))}
              <p>
                <strong>Total Paid:</strong> ${order.total}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
