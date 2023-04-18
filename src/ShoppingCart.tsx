import React, { useState } from 'react';

export interface Props {
  items: CartItem[];
}

export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
  }
  
const ShoppingCart: React.FC<Props> = ({ items }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(items); // Estado para armazenar os itens do carrinho

  const handleAddToCart = (itemId: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 }; // Atualiza a quantidade do item no carrinho
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleRemoveFromCart = (itemId: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(0, item.quantity - 1) }; // Atualiza a quantidade do item no carrinho, com mínimo de 0
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = (item: CartItem) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>O carrinho de compras está vazio</p>
      ) : (
        <ul>
        <h1>Carrinho de compras</h1>
          {cartItems.map(item => (
            <li key={item.id}>
            <img src={item.image} alt={item.name} />
              <div>
              <p> {item.description} </p>
              <p> R${item.price} </p>
              <p> Quantidade: {item.quantity}</p>
              <button onClick={() => handleAddToCart(item.id)}  > + </button>
              <button onClick={() => handleRemoveFromCart(item.id)}  > -  </button>
              {item.quantity} x R${item.price.toFixed(2)} = R${calculateSubtotal(item).toFixed(2)}
              </div>
            </li>
          ))}
          Total: R${calculateTotal().toFixed(2)}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
