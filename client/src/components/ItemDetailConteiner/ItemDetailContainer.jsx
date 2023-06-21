import { useState, useEffect } from "react";
import { useProductsContext } from "../../context/ProductsContext";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
const ItemDetailContainer = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const { getProductsByID } = useProductsContext();

  useEffect(() => {
    const renderProducts = async () => {
      const sendProducts = await getProductsByID(id);
      const productsFinish = sendProducts.data.result;
      setProducts(productsFinish);
    };
    renderProducts();
  }, [getProductsByID]);
  return (
    <div>
      <ItemDetail products={products} />
    </div>
  );
};

export default ItemDetailContainer;
