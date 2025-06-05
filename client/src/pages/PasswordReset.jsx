import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { axios, isLoggedIn } = useAppContext();

  //Redirects to (/) when loggedIn
  useEffect(() => {
  if (isLoggedIn) {
    navigate("/");
  }
}, [navigate, isLoggedIn]);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/send-reset-otp", { email });
      if (data.success) {
        toast.success(data.message);
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/reset-password", {
        email,
        OTP,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#7C3AED]" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
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

        {/* Main content */}
        <main className="flex-grow flex justify-center items-center px-3">
          <div className="bg-slate-800 rounded-lg shadow-lg max-w-md w-full p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-lg font-semibold bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-tr from-[#1E3A8A] to-[#7C3AED] rounded-full font-semibold hover:cursor-pointer transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <input
                  type="text"
                  required
                  placeholder="Enter OTP"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  className="w-full px-4 py-3 text-lg font-semibold bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-white"
                />
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 text-lg font-semibold bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-tr from-[#1E3A8A] to-[#7C3AED] rounded-full font-semibold hover:cursor-pointer transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PasswordReset;
