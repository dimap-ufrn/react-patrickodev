import React from "react";
import Burger from "../components/Burger";
import Pizza from "../components/Pizza";
import Sushi from "../components/Sushi";

const Menu: React.FC = () => {
  return (
    <div>
      <h1>Menu</h1>
      {/* Renderize os componentes de comida */}
      <Burger />
      <Pizza />
      <Sushi />
    </div>
  );
};

export default Menu;
