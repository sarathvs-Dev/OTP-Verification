import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Adjust the path as needed
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import home from "../assets/Group 4.png";
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setConfirmationResult } from '../redux/authSlice';

const LoginSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirmationResult = useSelector((state) => state.auth.confirmationResult);

  useEffect(() => {
    // Clean up the RecaptchaVerifier instance when the component unmounts
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handleSubmit();
          },
          "expired-callback": () => {
            setError("Recaptcha expired. Please try again.");
          },
        },
        auth
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.trim().length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors
    setUpRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        setShowOtpInput(true);
        dispatch(setConfirmationResult(confirmationResult)); // Dispatch action to store confirmation result
        toast.success("OTP sent successfully!");
        navigate("/Verification"); // Redirect to the OTP verification page
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to send OTP. Please try again.");
        console.error("Error during signInWithPhoneNumber", error);
      });
  };



  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="mt-[-40px]">
        <div className="min-h-[550px]" id="about">
          <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0">
            <div className="container">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ml-20">
                <div className="flex flex-col justify-center gap-6 sm:pt-0 max-w-lg mx-12">
                  <h1 className="text-3xl sm:text-4xl font-bold">Login</h1>
                  <p className="text-sm text-gray-500 tracking-wide leading-5">
                    Login to access your travelwise account
                  </p>
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="relative z-0 w-full mb-5 group">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                      <input
                        type="tel"
                        name="floating_phone"
                        id="floating_phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder=" "
                        required
                        disabled={showOtpInput}
                      />
                     
                    </div>

                    {showOtpInput && (
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="floating_otp"
                          id="floating_otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="block py-2.5 px-2.5 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_otp"
                          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-3 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
                        >
                          OTP
                        </label>
                      </div>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      ) : showOtpInput ? (
                        "Verify OTP"
                      ) : (
                        "Get OTP"
                      )}
                    </button>
                  </form>
                  <div id="recaptcha-container"></div>
                </div>

                <div>
                  <img
                    src={home}
                    alt="Login illustration"
                    className="max-w-[430px] w-full mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
