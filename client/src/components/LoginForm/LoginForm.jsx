import { Link } from "react-router-dom";
import image from "../../assets/github.png";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const username = data.email;
    const password = data.password;
    await login(username, password);
    reset();
  };

  return (
    <div>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              MundoTech
            </h1>
            <p className="text-white mt-1">¿Aun no tienes una cuenta?</p>
            <Link to="/register">
              <button
                type="submit"
                className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Registrate
              </button>
            </Link>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              ¡Bienvenido!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Inicia sesion para continuar.
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                ></path>
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
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
                placeholder="Email"
              />
              <small className="text-red-400">{errors?.email?.message}</small>
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Tienes que colocar tu contraseña",
                  },
                  minLength: {
                    value: 8,
                    message: "Debe tener al menos 8 caracteres",
                  },
                })}
                placeholder="Contraseña"
              />
              <small className="text-red-400">
                {errors?.password?.message}
              </small>
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Ingresar
            </button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              ¿Olvidaste tu contraseña?
            </span>
            <div>
              <h3 className="text-gray-800 text-center font-bold text-xl mt-7 mb-1">
                ¡Ingresa con GITHUB!
              </h3>
              <p className="text-sm font-normal text-center text-gray-600 mb-2">
                Inicia sesion con tu cuenta de Github.
              </p>
              <a
                href="http://localhost:8080/api/sessions/github"
                className="mx-auto w-48 flex px-14 bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold font-sans mb-2"
              >
                Github
                <img className="mx-2 w-6 h-6" src={image} />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
