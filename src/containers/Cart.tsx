// src/containers/Cart.tsx

import React, { useState } from "react";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  const addToCart = (item: string) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item: string) => {
    setCartItems(cartItems.filter((cartItem) => cartItem !== item));
  };

  return (
    <div>
      <h1>Cart</h1>
      {/* Adicione o código JSX para representar o carrinho de compras */}
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button onClick={() => removeFromCart(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
