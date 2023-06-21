import NavBar from "../components/NavBar/NavBar";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div>
      <NavBar />
      <div>
        <p className="text-center mt-24 text-2xl">
          Esta seccion aún esta en construcción...
        </p>
        <Link to={`/products/`}>
          <button className="py-2 px-4 mt-8 mx-auto shadow-lg shadow-blue-600/50 bg-blue-600 text-white rounded hover:bg-indigo-700 active:bg-indigo-700 disabled:opacity-50  flex items-center justify-center">
            Agregar Productos
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Contact;
