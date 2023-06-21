import ItemCart from "../ItemCart/ItemCart";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";

const ItemCartContainer = () => {
  const { userData } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [cartID, setCartID] = useState([]);
  const { getCartById, deleteProduct, deleteProductsInCart, purchase } =
    useCartContext();

  const deleteProductsCart = async () => {
    const response = await deleteProductsInCart(cartID);
    window.location.href = "/products";
    return response;
  };

  const responseDataUser = async () => {
    const response = await userData();
    return response;
  };
  useEffect(() => {
    const renderProducts = async () => {
      const user = await responseDataUser();
      const sendCart = await getCartById(user.cart);
      const CartFinish = await sendCart.data.result.products;
      setCartID(sendCart.data.result._id);
      setCart(CartFinish);
    };
    renderProducts();
  }, [getCartById]);

  //Precio de productos en carrito
  const price = cart.map((product) => {
    const products = product.price * product.quantity;
    const total = parseInt(products);
    return total;
  });

  //Precio total de productos en carrito
  const totalPrice = price.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  //Cantidad de productos en carrito
  const quantity = cart.map((product) => {
    const total = parseInt(product.quantity);
    return total;
  });
  //Cantidad de productos total en el carrito
  const total = quantity.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  const purchaseCart = async () => {
    const user = await responseDataUser();
    const ticket = {
      user: user.username,
      cartID: cartID,
      totalAmount: totalPrice,
      products: cart,
    };
    const response = await purchase(ticket);
    window.location.href = "/products";
    alert("Compra realizada con éxito");
    return response;
  };
  //Renderiza detalle de productos agregados al carrito
  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Carrito</h1>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Detalles de Producto
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Cantidad
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Subtotal
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Precio Total
              </h3>
            </div>

            {cart.map((product) => (
              <ItemCart
                key={product.IdProducto}
                product={product}
                cartID={cartID}
                deleteProduct={deleteProduct}
              />
            ))}
            <Link to={`/products/`}>
              <button className="flex font-semibold text-blue-500 text-sm mt-10">
                <svg
                  className="fill-current mr-2 text-blue-500 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Agregar Productos
              </button>
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Resumen Carrito
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm">
                Total Productos: {total}
              </span>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Precio Total:</span>
                <span className="font-medium text-3xl text-blue-800">
                  ${totalPrice}
                </span>
              </div>
              <button
                onClick={purchaseCart}
                className=" font-semibold shadow-blue-600/50 bg-blue-600 rounded hover:bg-indigo-700 active:bg-indigo-700 py-3 text-sm text-white uppercase w-full"
              >
                Terminar Pedido
              </button>
              <button
                className="py-2 px-4 mt-6 mx-auto shadow-lg shadow-blue-600/50 bg-blue-600 rounded hover:bg-indigo-700 active:bg-indigo-700 text-white disabled:opacity-50  flex items-center justify-center"
                onClick={() => deleteProductsCart()}
              >
                Eliminar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCartContainer;
