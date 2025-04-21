import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

const OrderHistory = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null); // For handling errors

  const fetchOrders = async () => {
    try {
      // Make the API request
      const res = await axios.get(
        `http://localhost:5000/api/orders/${phoneNumber}`
      );

      // Check if the response is an array and set it
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setError("No orders found for this phone number.");
        setOrders([]); // Clear orders in case the response is not an array
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError("Could not load order history.");
      setOrders([]);
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

      {/* Display error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* If no orders are found, show a message */}
      {orders.length === 0 && !error ? (
        <p>No orders found for this phone number.</p>
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
