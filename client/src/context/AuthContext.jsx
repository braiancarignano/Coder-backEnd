import { createContext, useContext, useState, useEffect } from "react";
import { set } from "react-hook-form";
import axios from "axios";
//Creacion de AuthContext para manejo de estados del carrito
const AuthContext = createContext([]);
export const useAuthContext = () => useContext(AuthContext);
//Declara estado de carrito y agregado o eliminado del LocalStorage
const AuthProvider = ({ children }) => {
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
        setUser(response.data.user);
      } else {
        alert("usuario no encontrado");
      }
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };

  const registerUser = async (first_name, last_name, email, password, age) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/sessions/register",
        {
          first_name,
          last_name,
          email,
          password,
          age,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };

  const isLogged = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sessions/current"
      );
      return console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sessions/logout"
      );
      const data = response.data;
      console.log(data);
      if (data.message === "LogoutOK") {
        window.location.href = "/login";
      } else {
        alert("logout failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ User, login, registerUser, logOut, isLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
