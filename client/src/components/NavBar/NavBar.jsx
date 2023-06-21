import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import CardWidget from "../CardWidget/CardWidget";
import image from "./usuario.png";
const NavBar = () => {
  const { cerrarSesion } = useAuthContext();
  //Renderiza menu de navegacion en la parte superior
  return (
    <nav className="bg-white py-2 md:py-4 bg-gradient-to-tr from-blue-800 to-purple-700">
      <div className="container px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center">
          <Link to="/products">
            <h1 className="text-white font-bold text-4xl font-sans">
              MundoTech
            </h1>
          </Link>
          <button
            className="border border-solid border-gray-600 px-3 py-1 rounded text-white opacity-50 hover:opacity-75 md:hidden"
            id="navbar-toggle"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div
          className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
          id="navbar-collapse"
        >
          <Link to="/">
            <button className="p-2 lg:px-4 md:mx-2 text-white font-semibold rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              Inicio
            </button>
          </Link>
          <Link to="/products">
            <button className="p-2 lg:px-4 md:mx-2 text-white font-semibold rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              Productos
            </button>
          </Link>
          <Link to="/contact">
            <button className="p-2 lg:px-4 md:mx-2 text-white font-semibold rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              Contacto
            </button>
          </Link>
          <CardWidget />
          <Link to="/profile">
            <div className="w-10 mx-2 px-2 py-2  text-white text-center font-semibold border border-solid border-white rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
              <img className="h-6" src={image} alt="profile" />
            </div>
          </Link>
          <Link to="/login">
            <button
              type="button"
              onClick={cerrarSesion}
              className="p-2 lg:px-4 text-white text-center font-semibold border border-solid border-white rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
            >
              Cerrar Sesión
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
