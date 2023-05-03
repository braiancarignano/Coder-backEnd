import { useForm } from "react-hook-form";
import { useProductsContext } from "../../context/ProductsContext";

const DeleteProductForm = () => {
  const { deleteProduct } = useProductsContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await deleteProduct(data.id);
    reset();
    alert("Producto eliminado");
  };
  return (
    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="text-gray-600">
          <p className="font-medium text-lg">Eliminar Producto</p>
          <p className="my-2">
            Para eliminar un producto debes colocar su numero de identificación.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
          <div className="md:col-span-3">
            <label htmlFor="productDeleteID">ID Producto</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="642ece4f62a6a514eea2e240"
              {...register("id", {
                required: {
                  value: true,
                  message: "Tienes que indicar el ID del producto a eliminar",
                },
                minLength: {
                  value: 24,
                  message: "El ID del producto debe tener 24 caracteres",
                },
                maxLength: {
                  value: 24,
                  message: "El ID del producto debe tener 24 caracteres",
                },
              })}
            />
            <small className="text-red-400">{errors?.id?.message}</small>
          </div>
          <div className="md:col-span-5 text-right">
            <div className="items-end">
              <button
                className="bg-indigo-600 p-4 rounded-2xl text-white font-semibold mt-6 m-3"
                type="submit"
              >
                Eliminar Producto
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteProductForm;
