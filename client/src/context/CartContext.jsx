import { createContext, useContext, useState, useEffect } from "react";
//Creacion de CartContext para manejo de estados del carrito
const CartContext = createContext([]);
export const useCartContext = () => useContext(CartContext);
//Declara estado de carrito y agregado o eliminado del LocalStorage
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("localCart")) || []
  );
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("localCart"));
    if (localCart?.length > 0) {
      setCart(localCart);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  //Agrega productos al carrito
  const addProduct = (item, quantity) => {
    let replaceCart;
    let product = cart.find((product) => product.id === item.id);
    if (product) {
      product.quantity += quantity;
      replaceCart = [...cart];
    } else {
      replaceCart = [...cart, { ...item, quantity: quantity }];
    }
    setCart(replaceCart);
  };

  //Elimina todos los productos del carrito
  const clearCart = () => setCart([]);

  //Elimina un producto del carrito segun ID
  const removeProductInCart = (id) => {
    return setCart(cart.filter((product) => product.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, clearCart, removeProductInCart, addProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
