import ItemCartContainer from "../components/ItemCartContainer/ItemCartContainer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import NavBar from "../components/NavBar/NavBar";

const Cart = () => {
  const { userData } = useAuthContext();
  const [cart, setCart] = useState([]);
  const { getCartById } = useCartContext();
  const responseDataUser = async () => {
    const response = await userData();
    return response;
  };
  useEffect(() => {
    const renderProducts = async () => {
      const user = await responseDataUser();
      const sendCart = await getCartById(user.cart);
      const CartFinish = await sendCart.data.result.products;
      setCart(CartFinish);
    };
    renderProducts();
  }, [getCartById]);
  return (
    <div>
      <NavBar />
      {cart.length > 0 ? (
        <ItemCartContainer />
      ) : (
        <div>
          <p className="text-center mt-24 text-2xl">
            No tienes productos en tu carrito aún...
          </p>
          <Link to={`/products/`}>
            <button className="py-2 px-4 mt-8 mx-auto shadow-lg shadow-blue-600/50 bg-blue-600 text-white rounded hover:bg-indigo-700 active:bg-indigo-700 disabled:opacity-50  flex items-center justify-center">
              Agregar Productos
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
