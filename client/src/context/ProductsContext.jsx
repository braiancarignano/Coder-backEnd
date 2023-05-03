import { createContext, useContext } from "react";
import axios from "axios";

const ProductsContext = createContext([]);
export const useProductsContext = () => useContext(ProductsContext);

const ProductsProvider = ({ children }) => {
  const getProducts = async () => {
    try {
      const getCurrentURL = () => {
        return window.location.href;
      };
      const getParameters = (currentURL) => {
        const myParams = {};
        let urlString = currentURL;
        let paramString = urlString.split("?")[1];
        let queryString = new URLSearchParams(paramString);
        for (let pair of queryString.entries()) {
          myParams[pair[0]] = pair[1];
        }
        return myParams;
      };
      const convertParamsToQuery = (params) => {
        let query = "";
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const value = params[key];
            query += `${key}=${value}&`;
          }
        }
        return query;
      };
      const url = getCurrentURL();
      const params = getParameters(url);
      const query = convertParamsToQuery(params);
      const response = await axios.get(
        `http://localhost:8080/api/products?${query}`
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  //FALTA COMPLETAR PARA LA VISTA DETALLE DEL PRODUCTO
  const getProductsByID = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  const createProduct = async (product) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/products`,
        product
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  const updateProduct = async (id, product) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/products/update/${id}`,
        product
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/products/delete/${id}`
      );
      return response;
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        getProducts,
        getProductsByID,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
