import React, { useState, useEffect, createContext } from "react";
import { food_list } from "../assets/assets";

export const contextParse = createContext();

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  let getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        let itemInfo = food_list.find((prod) => prod._id === items);
        totalAmount += itemInfo.price * cartItems[items];
      }
    }

    return totalAmount;
  };
  const [cartItems, setCartItems] = useState({});

  function addToCart(itemId) {
    if (!cartItems[itemId]) {
      setCartItems((prev) => {
        return {
          ...prev,
          [itemId]: 1,
        };
      });
    } else {
      setCartItems((prev) => {
        return {
          ...prev,
          [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
        };
      });
    }
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => {
      const currentQty = prev[itemId] || 0;
      if (currentQty <= 1) {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      } else {
        return { ...prev, [itemId]: currentQty - 1 };
      }
    });
  }

  const url = "https://digital-diner-assignment.onrender.com/api/users";
  const contextValue = {
    food_list,
    cartItems,
    getCartAmount,
    setCartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken,
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("tokened");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <contextParse.Provider value={contextValue}>
      {children}
    </contextParse.Provider>
  );
};

export default ContextProvider;
