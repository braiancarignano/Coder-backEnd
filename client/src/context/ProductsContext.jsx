import { createContext, useContext, useState, useEffect } from "react";
import { set } from "react-hook-form";
//Creacion de ProductsContext para manejo de estados del carrito
const ProductsContext = createContext([]);
export const useProductsContext = () => useContext(ProductsContext);
//Declara estado de carrito y agregado o eliminado del LocalStorage
const ProductsProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/sessions/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        console.log("paso", "User");
      } else {
        alert("usuario no encontrado");
      }
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };

  return (
    <ProductsContext.Provider value={{ login }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
