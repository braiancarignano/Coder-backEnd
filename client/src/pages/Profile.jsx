import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import React from "react";
import NavBar from "../components/NavBar/NavBar";

const Profile = () => {
  const { userData, userPremium, cerrarSesion } = useAuthContext();
  const [user, setUser] = useState(false);
  const responseData = async () => {
    const response = await userData();
    setUser(response);
  };
  const premium = async () => {
    const user = await userData();
    const response = await userPremium(user.id);
    cerrarSesion();
    return response;
  };
  useEffect(() => {
    responseData();
  }, []);

  return (
    <div>
      <NavBar />
      {user ? (
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white shadow-2xl bg-clip-border shadow-3xl shadow-shadow-500">
              <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                  className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                />
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-blue-400">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://static.vecteezy.com/system/resources/previews/008/302/421/non_2x/eps10-white-user-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-black-background-free-vector.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-16 flex flex-col items-center">
                <h4 className="text-xl font-bold text-navy-700">
                  {user.firtsname + " "}
                  {user.lastname}
                </h4>
                <p className="text-gray-600">Usuario:</p>
                <p className="text-lg font-bold text-navy-700">
                  {user.username}
                </p>
                <p className="text-lg font-medium text-gray-600">{user.rol}</p>
                {user.rol === "Premium" ? (
                  <></>
                ) : (
                  <button
                    onClick={premium}
                    className="my-4 py-2 px-8 font-semibold shadow-lg shadow-blue-700/50 bg-blue-700 text-white rounded-2xl hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50 w-full flex items-center justify-center"
                  >
                    Cambia a PREMIUM
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>USUARIO NO AUTORIZADO</div>
      )}
    </div>
  );
};

export default Profile;
