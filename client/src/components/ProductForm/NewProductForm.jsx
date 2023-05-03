import React from "react";
import { useForm } from "react-hook-form";
import { useProductsContext } from "../../context/ProductsContext";
const NewProductForm = () => {
  const { createProduct } = useProductsContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    await createProduct(data);
    alert("Producto creado");
    reset();
  };
  return (
    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="text-gray-600">
          <p className="font-medium text-lg capitalize">Crear Productos</p>
          <p className="my-2">
            Para crear un producto debes completar los siguientes campos.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
          <div className="md:col-span-3">
            <label htmlFor="title">Nombre</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="Xiaomi"
              {...register("title", {
                required: {
                  value: true,
                  message: "Tienes que colocar el nombre del producto",
                },
                minLength: {
                  value: 2,
                  message: "Debe tener al menos 2 caracteres",
                },
              })}
            />
            <small className="text-red-400">{errors?.title?.message}</small>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="descripcion">Descripcion</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="Note 11 128GB 6GB RAM"
              {...register("description", {
                required: {
                  value: true,
                  message: "Tienes que colocar la description del producto",
                },
                minLength: {
                  value: 2,
                  message: "Debe tener al menos 2 caracteres",
                },
              })}
            />
            <small className="text-red-400">
              {errors?.description?.message}
            </small>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="59999"
              {...register("price", {
                required: {
                  value: true,
                  message: "Tienes que colocar el precio del producto",
                },
                minLength: {
                  value: 1,
                  message: "Debe tener al menos 1 caracteres",
                },
              })}
            />
            <small className="text-red-400">{errors?.price?.message}</small>
          </div>
          <div className="md:col-span-5">
            <label htmlFor="thumbnail">Imagen</label>
            <input
              type="url"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="https://example.com"
              {...register("thumbnail", {
                required: {
                  value: true,
                  message:
                    "Tienes que colocar el link de la imagen del producto",
                },
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            <small className="text-red-400">{errors?.thumbnail?.message}</small>
          </div>
          <div className="md:col-span-5">
            <label htmlFor="codigo">Codigo</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="10001"
              {...register("code", {
                required: {
                  value: true,
                  message: "Tienes que colocar el codigo del producto",
                },
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            <small className="text-red-400">{errors?.code?.message}</small>
          </div>
          <div className="md:col-span-5">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="5"
              {...register("stock", {
                required: {
                  value: true,
                  message: "Tienes que colocar el stock del producto",
                },
                minLength: {
                  value: 1,
                  message: "Debe tener al menos 1 caracteres",
                },
              })}
            />
            <small className="text-red-400">{errors?.stock?.message}</small>
          </div>
          <div className="md:col-span-5 text-right">
            <div className="items-end">
              <button
                className="bg-indigo-600 p-4 rounded-2xl text-white font-semibold mt-6 m-3 capitalize"
                type="submit"
              >
                Crear Producto
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductForm;
