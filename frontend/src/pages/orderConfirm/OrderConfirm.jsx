import React, { useContext, useState } from "react";
import "./Order.css";
import { contextParse } from "../../context/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderConfirm = () => {
  const { cartItems, food_list, getCartAmount, clearCart } =
    useContext(contextParse);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const selectedItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      phoneNumber: formData.phone,
      email: formData.email,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      },
      items: selectedItems,
      total: getCartAmount() + 2,
    };

    try {
      await axios.post(
        "https://digital-diner-assignment.onrender.com/api/orders",
        orderData
      );
      setMessage({ text: "Order placed successfully!", type: "success" });
     // clearCart();
      setTimeout(() => {
        navigate("/order-history");
      }, 3000);
    } catch (err) {
      console.error("Order failed", err);
      setMessage({ text: "Order submission failed!", type: "error" });
    }
  };

  return (
    <div className="order-container">
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form className="place-order" onSubmit={handleOrderSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            onChange={handleChange}
            required
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              required
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>${getCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getCartAmount() === 0 ? 0 : getCartAmount() + 2}</b>
            </div>
            <button type="submit">Place Order</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderConfirm;
