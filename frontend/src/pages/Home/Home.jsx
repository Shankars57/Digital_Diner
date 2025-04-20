import React,{useState} from "react";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import FoodDisplayStatic from "../../components/FoodDisplay/FoodDisplayStatic";
import "./Home.css";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
const Home = () => {
  const[category, setCategory] = useState("All");
  return (
    <div>
      <Header  />
      <Menu  category={category} setCategory={setCategory}/>
      <FoodDisplayStatic category={category} />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
