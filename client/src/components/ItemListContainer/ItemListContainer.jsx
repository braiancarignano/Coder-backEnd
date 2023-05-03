import { useEffect, useState } from "react";
import { useProductsContext } from "../../context/ProductsContext";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = () => {
  const { getProducts } = useProductsContext();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const renderProducts = async () => {
      const sendProducts = await getProducts();
      const productsFinish = sendProducts.data.result.payload;
      setProducts(productsFinish);
    };
    renderProducts();
  }, [getProducts]);
  return (
    <div>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
