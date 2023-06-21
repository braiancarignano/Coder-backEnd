import { createContext, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext([]);
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const getCartById = async (cid) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/carts/${cid}`
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  const getCartUser = async () => {
    try {
      const cart = await userData();
      if (cart.cart == undefined) {
        return;
      } else {
        const response = await getCartById(cart.cart);
        return response.data.result;
      }
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  const updateCart = async (cart, productID, product) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/carts/${cart}/product/${productID}`,
        product
      );
      return response.data.result;
    } catch (error) {
      console.log(error.config);
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  const deleteProduct = async (cart, product) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/carts/delete/${cart}/product/${product}`
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  const deleteProductsInCart = async (cart) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/carts/delete/${cart}`
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };

  const purchase = async (ticket) => {
    try {
      console.log(ticket);
      const response = await axios.post(
        `http://localhost:8080/api/carts/purchase`,
        ticket
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        getCartUser,
        getCartById,
        updateCart,
        deleteProduct,
        deleteProductsInCart,
        purchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
