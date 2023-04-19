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

  const handleRemoveAll = (itemId: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(0, item.quantity - item.quantity) }; // Atualiza a quantidade do item no carrinho, com mínimo de 0
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
    <div className="shopping-cart">
  {cartItems.length === 0 ? (
    <p className="cart-empty">O carrinho de compras está vazio</p>
  ) : (
    <ul className="cart-items">
      <h1 className="cart-header">Carrinho de compras</h1>
      {cartItems.map(item => (
        <li key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <p className="cart-item-description">{item.description}</p>
            <p className="cart-item-price">R${item.price}</p>
            <p className="cart-item-quantity">Quantidade: {item.quantity}</p>
            <button onClick={() => handleAddToCart(item.id)} className="cart-item-button">+</button>
            <button onClick={() => handleRemoveFromCart(item.id)} className="cart-item-button">-</button>
            <p className="cart-item-subtotal">{item.quantity} x R${item.price.toFixed(2)} = R${calculateSubtotal(item).toFixed(2)}</p>
            <button onClick={() => handleRemoveAll(item.id)} className="cart-item-button">LIXO</button>
          </div>
        </li>
      ))}
      <p className="cart-total">
        <p className="cart-total-label">Total:</p>
        <p className="cart-total-value">R${calculateTotal().toFixed(2)}</p>
      </p>
    </ul>
  )}
</div>
  );
};

export default ShoppingCart;
