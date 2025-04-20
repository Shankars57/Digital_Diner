import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { contextParse } from "../../context/ContextProvider";
const FoodItem = ({ id, name, price, desc, img }) => {
  const [itemCount, setItemCount] = useState(0);
  const { addToCart, removeFromCart } = useContext(contextParse);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={img} alt="name" className="food-item-image" />
        {!itemCount ? (
          <div className="food-item-add-to-cart">
            {" "}
            <p>Add To cart</p>{" "}
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setItemCount((prev) => prev + 1)}
              src={assets.add_icon_white}
              alt="add"
            />
          </div>
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => {
                removeFromCart(id);
                setItemCount((prev) => prev - 1);
              }}
              alt="remove"
            />
            <p>{itemCount}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => {
                addToCart(id);
                setItemCount((prev) => prev + 1);
              }}
              alt="add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img
            src={assets.rating_starts}
            alt="rating"
            className="food-item-rating"
          />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
