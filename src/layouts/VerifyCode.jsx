import React, { useState } from "react";
import home from "../assets/Group 4.png";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from 'react-redux';
import { firestore } from "../firebase/firebase";

const VerifyCode = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  const confirmationResult = useSelector((state) => state.auth.confirmationResult);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.trim().length !== 6 || !/^\d+$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      // Verify OTP
      const result = await confirmationResult.confirm(otp);
      setLoading(false);
      toast.success("OTP verified successfully!");

      if (result.user) {
        const userRef = doc(firestore, "users", result.user.uid);

        // Check if the document already exists
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          navigate("/home");
        } else {
          navigate("/signup");
        }
      }

    } catch (error) {
      setLoading(false);
      setOtpError("Invalid OTP. Please try again.");
      console.error("Error during OTP verification", error);
    }
  };

  return (
    <div>
      <div className="mt-[-40px]">
        <div className="min-h-[550px]" id="about">
          <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0">
            <div data-aos="slide-up" data-aos-duration="300" className="container">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ml-20">

                <div className="flex flex-col justify-center gap-6 sm:pt-0 max-w-lg mx-12">
                  <Link to={{ pathname: "/" }}>
                    <div className="flex items-center mt-2">
                      <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                      </svg>
                      <label
                        htmlFor="signupCheckbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Back to home
                      </label>
                    </div>
                  </Link>
                  <h1 className="text-3xl sm:text-4xl font-bold">Verify code</h1>
                  <p className="text-sm text-gray-500 tracking-wide leading-5">
                    An authentication code has been sent to your Phone number.
                  </p>
                  <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* OTP input */}
                    <div className="relative z-0 w-full mb-5 group">
                      <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                      <input
                        type="text"
                        name="otp"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=" "
                        required
                      />
                    </div>

                    {otpError && <p className="text-red-500 text-sm">{otpError}</p>}

                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>

                  </form>
                </div>

                <div>
                  <img
                    src={home}
                    alt="verification img"
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

export default VerifyCode;
