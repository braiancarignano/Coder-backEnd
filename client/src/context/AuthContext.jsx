import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

//Creacion de AuthContext para manejo de estados del carrito
const AuthContext = createContext([]);
export const useAuthContext = () => useContext(AuthContext);
//Declara estado de carrito y agregado o eliminado del LocalStorage
const AuthProvider = ({ children }) => {
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

  const userData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sessions/current",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, registerUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
