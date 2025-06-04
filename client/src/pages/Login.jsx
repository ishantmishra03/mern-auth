import { redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const { axios, setIsLoggedIn, getUserData, isLoggedIn, userData } =
    useAppContext();
  const navigate = useNavigate();
  const [method, setMethod] = useState("Sign Up");

  useEffect(() => {
    {
      isLoggedIn && userData && redirect("/");
    }
  }, [isLoggedIn, userData]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (method === "Sign Up") {
        const { data } = await axios.post("/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast(error.message);
    } finally {
      setName("");
      setPassword("");
      setEmail("");
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#7C3AED]" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="w-full">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4 sm:p-6 sm:px-8 py-3">
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 rounded-full p-1 cursor-pointer select-none"
            >
              <span className="text-slate-100 font-bold text-2xl">Auth0</span>
            </div>
          </div>
        </nav>

        <main className="flex-grow flex justify-center items-center px-3">
          <div className="bg-slate-800 rounded-lg shadow-lg max-w-md w-full p-8 text-white">
            <h1 className="text-3xl font-extrabold text-center mb-6">
              {method === "Sign Up" ? "Create Account" : "Login"}
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {method === "Sign Up" && (
                <div className="flex items-center bg-slate-700 rounded-md px-3 py-2">
                  <FiUser className="text-slate-400 mr-3 text-xl" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full bg-transparent placeholder-slate-400 text-white focus:outline-none focus:ring-0"
                  />
                </div>
              )}
              <div className="flex items-center bg-slate-700 rounded-md px-3 py-2">
                <FiMail className="text-slate-400 mr-3 text-xl" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent placeholder-slate-400 text-white focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex items-center bg-slate-700 rounded-md px-3 py-2">
                <FiLock className="text-slate-400 mr-3 text-xl" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-transparent placeholder-slate-400 text-white focus:outline-none focus:ring-0"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-tr from-[#1E3A8A] to-[#7C3AED]  rounded-full font-semibold hover:cursor-pointer transition"
              >
                {method === "Sign Up" ? "Sign Up" : "Login"}
              </button>
            </form>

            {/* Toggle Method */}
            <p className="mt-6 text-center text-sm text-slate-400">
              {method === "Sign Up"
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                onClick={() =>
                  setMethod(method === "Sign Up" ? "Login" : "Sign Up")
                }
                className="text-blue-400 hover:underline font-semibold cursor-pointer"
                type="button"
              >
                {method === "Sign Up" ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
