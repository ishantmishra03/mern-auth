import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, setUserData, axios } = useAppContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const {data} = await axios.post('/api/auth/logout');
      if(data.success){
        setIsLoggedIn(false);
        setUserData(null);
        toast.success(data.message)
        navigate("/");
      } else  {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 sm:p-6 sm:px-26 py-2.5">
        <div className="flex items-center space-x-2 rounded-full p-1">
          <span
            onClick={() => navigate("/")}
            className="text-slate-800 font-bold text-2xl cursor-pointer"
          >
            Auth0
          </span>
        </div>

        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-6 py-3 text-md font-semibold text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 shadow-sm cursor-pointer"
          >
            Login <FiArrowRight className="text-lg" />
          </button>
        )}

        {
          isLoggedIn && (
            <button
            onClick={logout}
            className="flex items-center gap-2 px-6 py-3 text-md font-semibold text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 shadow-sm cursor-pointer"
          >
            Logout <FiArrowRight className="text-lg" />
          </button>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;
