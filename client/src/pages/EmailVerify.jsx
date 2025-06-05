import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const EmailVerify = () => {
  const navigate = useNavigate();
  const { axios, userData } = useAppContext();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);
      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, 6);
    if (/^\d{6}$/.test(pasted)) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit;
        }
      });
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/verify-account", {
        OTP: enteredOtp,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Redirects to (/) when already verified
  useEffect(() => {
    if (userData?.isVerified) {
      navigate("/");
    }
  }, [userData, navigate]);

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
            <h1 className="text-2xl font-bold text-center mb-4">
              Verify Email
            </h1>
            <p className="text-center text-slate-400 mb-6">
              Enter the 6-digit code sent to your email.
            </p>

            <form onSubmit={handleSubmit}>
              <div
                className="flex justify-between mb-6 gap-2"
                onPaste={handlePaste}
              >
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-xl rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-tr from-[#1E3A8A] to-[#7C3AED] rounded-full font-semibold hover:cursor-pointer transition"
              >
                Verify
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmailVerify;
