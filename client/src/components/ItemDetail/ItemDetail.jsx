import React, { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import NavBar from "../NavBar/NavBar";
import { useCartContext } from "../../context/CartContext";

const ItemDetail = ({ products }) => {
  const { updateCart, getCartUser } = useCartContext();
  const [buy, setBuy] = useState(false);

  const addProduct = async (quantity) => {
    const cart = await getCartUser();
    const quantityProduct = parseInt(quantity);
    await updateCart(cart._id, products._id, { quantity: quantityProduct });
  };

  const handleOnAdd = async (quantity) => {
    setBuy(false);
    const response = await addProduct(quantity);
    setBuy(true);
  };
  return (
    <div>
      <NavBar />
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container mx-auto px-5">
          <div className="lg:w-4/5 flex">
            <div className="m-14 h-2/5 w-2/5">
              <img alt="Image Product" src={products.thumbnail} />
            </div>
            <div className="lg:w-1/2 ml-20 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="py-4 border-b-2 border-gray-200">
                <h1 className="text-gray-900 text-3xl title-font font-medium capitalize mb-3">
                  {products.title}
                </h1>
                <h2 className="text-gray-900 text-xl title-font font-medium mt-7 ml-4">
                  Descripcion:
                </h2>
                <ul className="p-3 text-slate-800">
                  <li className="p-1 font-thin">{products.description}</li>
                </ul>
                <span className="font-medium text-3xl text-blue-800">
                  ${products.price}
                </span>
              </div>
              <div className="flex mt-4">
                <ItemCount stock={products.stock} onAdd={handleOnAdd} />
              </div>
              {buy ? (
                <div className="ml-52 mt-6">
                  <Link to={`/cart`}>
                    <button className="py-2 px-4 shadow-lg shadow-blue-600/50 bg-blue-600 text-white rounded hover:bg-indigo-700 active:bg-indigo-700 disabled:opacity-50">
                      Ir a Carrito
                    </button>
                  </Link>
                </div>
              ) : (
                <></>
              )}
              <Link to={`/products/`}>
                <button className="py-2 px-4 mt-10 mx-auto shadow-lg shadow-blue-600/50 bg-blue-600 text-white rounded hover:bg-indigo-700 active:bg-indigo-700 disabled:opacity-50  flex items-center justify-center">
                  Agregar otros Productos
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDetail;
