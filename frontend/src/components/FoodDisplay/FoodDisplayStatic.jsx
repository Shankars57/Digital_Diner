import { useContext } from "react";
import { contextParse } from "../../context/ContextProvider";
import FoodItem from "../FoodItem/FoodItem";
import "./Static.css";
const FoodDisplayStatic = ({ category }) => {
  const { food_list } = useContext(contextParse);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you.</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || item.category === category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                desc={item.description}
                img={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplayStatic;
