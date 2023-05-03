import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

const Form = () => {
  const { registerUser } = useAuthContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  //Desestructura utilidad de libreria para validaciones
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const first_name = data.first_name;
    const last_name = data.last_name;
    const email = data.email;
    const password = data.password;
    const age = data.age;
    await registerUser(first_name, last_name, email, password, age);
    alert("Registro exitoso");
    reset();
    setIsSubmitted(true);
  };

  //Renderizado de formulario para compra/consulta con sus validaciones y mensajes de error
  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-800 to-purple-700 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">¡Registrate!</p>
                <p className="my-2">
                  Para crear una cuenta debes completar los siguientes campos.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
                <div className="md:col-span-3">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    {...register("first_name", {
                      required: {
                        value: true,
                        message: "Tienes que colocar tu nombre",
                      },
                      minLength: {
                        value: 2,
                        message: "Debe tener al menos 2 caracteres",
                      },
                    })}
                  />
                  <small className="text-red-400">
                    {errors?.first_name?.message}
                  </small>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    {...register("last_name", {
                      required: {
                        value: true,
                        message: "Tienes que colocar tu apellido",
                      },
                      minLength: {
                        value: 2,
                        message: "Debe tener al menos 2 caracteres",
                      },
                    })}
                  />
                  <small className="text-red-400">
                    {errors?.last_name?.message}
                  </small>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Tienes que colocar una contraseña",
                      },
                      minLength: {
                        value: 8,
                        message: "Debe tener al menos 8 caracteres",
                      },
                    })}
                  />
                  <small className="text-red-400">
                    {errors?.password?.message}
                  </small>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="age">Edad</label>
                  <input
                    type="number"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    {...register("age", {
                      required: {
                        value: true,
                        message: "Tienes que colocar tu edad",
                      },
                      minLength: {
                        value: 2,
                        message: "Debe tener al menos 2 caracteres",
                      },
                    })}
                  />
                  <small className="text-red-400">{errors?.age?.message}</small>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Tienes que colocar tu email",
                      },
                      minLength: {
                        value: 3,
                        message: "El email debe tener al menos 3 caracteres",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "El email no es válido",
                      },
                    })}
                  />
                  <small className="text-red-400">
                    {errors?.email?.message}
                  </small>
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="items-end">
                    <button
                      className="bg-indigo-600 p-4 rounded-2xl text-white font-semibold mt-6 m-3"
                      type="submit"
                    >
                      Registrarme
                    </button>
                    <p className="text-sm mt-3 mx-4">¿Ya tienes una cuenta?</p>
                    <a
                      href="/login"
                      className="text-sm mx-5 text-indigo-600 cursor-pointer"
                    >
                      Inicia sesión
                    </a>
                  </div>
                </div>
                {isSubmitted && <Navigate to="/login" />}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
