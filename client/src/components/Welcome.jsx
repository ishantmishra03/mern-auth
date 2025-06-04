import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

const Welcome = () => {
  const { isLoggedIn, userData } = useAppContext();
  return (
    <div className="flex flex-col items-center mt-16 px-4 text-center max-w-xl mx-auto">
     
      <div className="relative w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-lg">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <img
            src="/developer.avif"
            alt="Developer"
            className="w-40 h-40 object-cover rounded-full cursor-pointer"
          />
        </div>
      </div>

      
      <h1 className="mt-8 text-4xl font-extrabold text-gray-900 tracking-tight">
        Welcome {isLoggedIn && userData ? userData.name : "Coder"}
      </h1>

      
      <p className="mt-4 text-gray-600 text-lg max-w-md">
        Empower your development skills with cutting-edge tools and tutorials.
      </p>

      <button className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer">
        Get Started <FiArrowRight className="text-xl" />
      </button>
    </div>
  );
};

export default Welcome;
