import image from "./carrito.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

const CardWidget = () => {
  const { getCartUser } = useCartContext();
  const [cartProducts, setCartProducts] = useState(0);

  const cart = async () => {
    const userCart = await getCartUser();
    if (userCart != undefined) {
      const quantity = userCart.products.map((product) => {
        return parseInt(product.quantity);
      });
      const total = quantity.reduce((a, b) => a + b, 0);
      setCartProducts(total);
    } else {
      setCartProducts(0);
    }
  };
  cart();

  return (
    <Link to={`/cart`}>
      <div>
        <div className="flex w-18 mx-2 px-2 py-2 text-white text-center font-semibold border border-solid border-white rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300">
          <img className="w-6 h-6" src={image} alt="CardWidget" />
          <p className="text-white ml-1 font-light">{cartProducts}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardWidget;
