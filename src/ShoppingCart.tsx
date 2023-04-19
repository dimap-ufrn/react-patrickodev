import React, { useState } from 'react';
import './ShoppingCart.css';
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
  const [cep, setCep] = useState('');
  const [ddd, setDDD] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');

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

  //para ir somando os itens no cartItems e acumular o valor total do carrinho
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const calculateTotalQuantity = () => {
    // Use o método reduce para somar a quantidade de cada item no carrinho
    const totalQuantity = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);
    return totalQuantity;
  };

  const handleCepChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    // Remove caracteres não numéricos do valor do CEP
    const numericValue = value.replace(/\D/g, '');

    // Limita o valor do CEP a 8 dígitos
    const limitedValue = numericValue.slice(0, 8);

    // Atualiza o estado com o valor do CEP limitado a 8 dígitos
    setCep(limitedValue);
  };

  const fetchAddressFromCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      // Verifica se a resposta da API possui cidade e estado
      if (data.ddd && data.uf && data.localidade) {
        // Atualiza o parametro com o dado obtido da API
        setDDD(data.ddd);
        setLocalidade(data.localidade);
        setUf(data.uf);
      
      } else {
        // Caso não haja cidade e estado na resposta da API,
        // exibe mensagem de erro para o usuário
        alert('CEP não encontrado. Por favor, verifique o CEP informado.');
      }
    } catch (error) {
      // Caso ocorra algum erro na chamada à API,
      // exibe mensagem de erro para o usuário
      alert('Ocorreu um erro na consulta do CEP. Por favor, tente novamente.');
    }
  };
  
  const calculateFrete = () =>{
    const dddInt = parseInt(ddd);

    // Calcula a diferença entre o DDD do CEP e 84
    const diferenca = dddInt - 84;

    // Verifica se a diferença é negativa e multiplica por -1 se for o caso
    const cepCalculado = diferenca < 0 ? (diferenca * -1) : diferenca;

    return cepCalculado;

  }
  
  const freteValue = calculateFrete();
  const productValue = calculateTotal();
  const orderValue = freteValue + productValue;
  console.log("total: ", productValue ," - frete: ", freteValue )

  return (
    <div className="shopping-cart">
      <ul className="cart-items">
      <h1 className="cart-header">Carrinho de compras</h1>
      {calculateTotalQuantity() === 0 ? <h2>O carrinho está vazio</h2> : <h2>Você tem {calculateTotalQuantity()} 
      {calculateTotalQuantity() === 1 ? ' item' : ' itens'}</h2>}
      
      {cartItems.map(item => (
        <li key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <p className="cart-item-description">{item.description}</p>
            <p className="cart-item-price">R${item.price}</p>
            Quantidade: {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)} className="cart-item-button">-</button>
            <button onClick={() => handleAddToCart(item.id)} className="cart-item-button">+</button>            
            <p/>{item.quantity} x R${item.price.toFixed(2)} = R${calculateSubtotal(item).toFixed(2)}
            <button onClick={() => handleRemoveAll(item.id)} className="cart-item-button">LIXO</button>
          </div>
        </li>
      ))}
    </ul>
    <ul>
    <p className="cart-total">
      <h2>Resumo</h2>
      <input
          type="text"
          value={cep}
          maxLength={8} // Define o máximo de caracteres como 8
          onChange={handleCepChange}
          placeholder="Informe seu CEP"
        />
        <button onClick={fetchAddressFromCep}>Calcular Frete</button>
        <p className="cart-item-details">{localidade} - {uf}</p>
        <p> Valor do frete: R${calculateFrete()}</p>
        <p className="cart-total-value">Itens ({calculateTotalQuantity()}) R${calculateTotal().toFixed(2)}</p>
        <p className="cart-total-value">Frete R${calculateFrete()}</p>
        <p className="cart-total-label">Total: R${orderValue.toFixed(2)}</p>
        <button className="cart-final-button">Fechar pedido</button>
      </p>
    </ul>
</div>
  );
};

export default ShoppingCart;
