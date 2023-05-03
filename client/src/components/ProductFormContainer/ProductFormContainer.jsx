import NewProductForm from "../ProductForm/NewProductForm";
import EditProductForm from "../ProductForm/EditProductForm";
import DeleteProductForm from "../ProductForm/DeleteProductForm";

const ProductFormContainer = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-800 to-purple-700 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <NewProductForm />
        <EditProductForm />
        <DeleteProductForm />
      </div>
    </div>
  );
};

export default ProductFormContainer;
