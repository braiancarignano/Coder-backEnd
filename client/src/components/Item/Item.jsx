const Item = ({ title, description, _id, price }) => {
  return (
    <div className="w-64 bg-white border shadow-2xl rounded-xl m-6">
      <div className="h-56 rounded-t-xl bg-gray-300 flex flex-col justify-center bg-cover bg-center">
        <h2 className="absolute text-sm bg-blue-700 rounded-3xl text-white p-2 font-medium mt-52 ml-2">
          OFERTA
        </h2>
      </div>
      <div className="p-2 flex flex-col text-center items-center">
        <h3 className="text-blue-800 text-lg font-medium mt-2 uppercase">
          {title}
        </h3>
        <h2 className="text-black-700 text-medium font-medium">
          {description}
        </h2>
        <h2 className="text-black-700 text-xs m-2">ID: {_id}</h2>
        <h3 className="text-blue-800 text-2xl font-semibold mt-3">${price}</h3>
        <button className="my-4 py-2 px-8 font-semibold shadow-lg shadow-blue-700/50 bg-blue-700 text-white rounded-2xl hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50 w-full flex items-center justify-center">
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  );
};

export default Item;
