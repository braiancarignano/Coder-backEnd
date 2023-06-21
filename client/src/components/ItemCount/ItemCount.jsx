import { useState } from "react";
//Contador para sumar o restar los productos que van al carrito
const ItemCount = ({ stock, onAdd }) => {
  const [initial, setInitial] = useState(1);
  const increment = () => {
    if (initial < stock) {
      setInitial(initial + 1);
    } else {
      return;
    }
  };
  const decrement = () => {
    if (initial > 1) {
      setInitial(initial - 1);
    } else {
      return;
    }
  };
  const addToCart = () => {
    onAdd(initial);
    setInitial(1);
  };

  return (
    <div className="inline-flex items-center mx-28">
      <button
        onClick={decrement}
        className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 12H4"
          />
        </svg>
      </button>
      <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
        {initial}
      </div>
      <button
        onClick={increment}
        className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <button
        className="text-lg font-semibold text-center ml-10 p-3 shadow-lg shadow-blue-700/50 bg-blue-700 text-white rounded hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50  flex items-center justify-center"
        onClick={addToCart}
      >
        AGREGAR
      </button>
    </div>
  );
};

export default ItemCount;
