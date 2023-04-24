import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

const Form = () => {
  //Desestructura utilidad de libreria para validaciones
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const { registerUser } = useAuthContext();
  const registerSubmit = async () => {
    try {
      await registerUser(first_name, last_name, email, password, age);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
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

              <form
                id="register"
                onSubmit={handleSubmit(registerSubmit)}
                className="lg:col-span-2"
              >
                <div className="md:col-span-3">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=""
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder=""
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                  />
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="age">Edad</label>
                  <input
                    type="text"
                    name="age"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder=""
                  />
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@email.com"
                  />
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
