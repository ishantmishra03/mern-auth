import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    axios,
    userData,
    getUserData,
  } = useAppContext();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setMenuOpen(false);
  };

  const verifyEmail = async () => {
    try {
      const { data } = await axios.post("/api/auth/send-verify-otp");
      if (data.success) {
        toast.success(data.message);
        navigate("/verify-account");
        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setMenuOpen(false);
  };

  const firstLetter = userData?.name?.charAt(0).toUpperCase() || "?";

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 sm:p-6 sm:px-8 py-3">
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 rounded-full p-1 cursor-pointer select-none"
          aria-label="Go to homepage"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" ? navigate("/") : null)}
        >
          <span className="text-slate-800 font-bold text-2xl">Auth0</span>
        </div>

        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-6 py-3 text-md font-semibold text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 shadow-sm cursor-pointer"
          >
            Login <FiArrowRight className="text-lg" />
          </button>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              {firstLetter}
            </button>

          
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-3 z-20">
                {!userData.isVerified && (
                  <button
                    onClick={verifyEmail}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Verify Email
                  </button>
                )}
                <button
                  onClick={logout}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  Logout <FiArrowRight className="text-md" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
