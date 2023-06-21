import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

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
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
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
      window.location.href = "/login";
    } catch (error) {
      console.log(error.message);
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  const cerrarSesion = () => {
    document.cookie =
      "CookieToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
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
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("No has iniciado sesion");
      }
      if (error.response && error.response.status === 403) {
        throw new Error("No estás autorizado");
      } else {
        console.error(error);
      }
    }
  };

  const userPremium = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/sessions/premium/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      alert("Lo siento algo ha salido mal");
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, registerUser, userData, cerrarSesion, userPremium }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
