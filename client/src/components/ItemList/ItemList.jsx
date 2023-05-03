import Item from "../Item/Item";
const ItemList = ({ products }) => {
  return (
    <div className="flex flex-wrap w-full">
      {products.map((product) => (
        <Item key={product._id} {...product} />
      ))}
    </div>
  );
};

export default ItemList;
