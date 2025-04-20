import React, { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CartPage from "./pages/Cart/CartPage";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderConfirm from "./pages/orderConfirm/OrderConfirm";
import Footer from "./components/Footer/Footer";

export function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderConfirm />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
