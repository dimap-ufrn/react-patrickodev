import React from 'react';
import ShoppingCart from './ShoppingCart';
import { CartItem } from './ShoppingCart';

const App: React.FC = () => {
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Churrasquinho',
      description: 'Delicioso espetinho à moda da (sua) casa',
      price: 98.99,
      image: 'imagem1.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Pizza da mãe',
      description: 'Saborosa Pizza caseira feita por sua mãe',
      price: 79.99,
      image: 'imagem2.jpg',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Espaguete',
      description: 'Apetitoso nacarrão, basta seguir a receita',
      price: 119.99,
      image: 'imagem3.jpg',
      quantity: 1,
    },
  ];

  return (
    <div>
      {/* Renderize outros componentes do seu aplicativo */}
      <ShoppingCart items={cartItems} />
    </div>
  );
};

export default App;
