import React from "react";
import "./Menu.css";
import { menu_list } from "../../assets/assets";
const Menu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu.</h1>

      <p className="explore-menu-text">
        choose from a diverse menu featuring a delectable array of dishes . Our
        mission is to satisfy your hungry stomach.{" "}
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={item.menu_name}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
