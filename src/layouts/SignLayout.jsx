import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth, firestore } from "../firebase/firebase"; // Adjust the path to your Firebase config file
import home from "../assets/signup.png";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(firestore, "users", user.uid);
          await setDoc(userRef, {
            firstName,
            lastName,
            email,
          });

        toast.success("Profile updated successfully!");
        navigate("/home");
      } else {
        setError("No user is currently signed in.");
      }
    } catch (error) {
      setError("Error updating profile. Please try again.");
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-[-40px]">
        <div className="min-h-[550px]" id="about">
          <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0">
            <div className="container">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ml-20">
                <div>
                  <img
                    src={home}
                    alt="Sign-up illustration"
                    className="max-w-[350px] w-full mx-auto"
                  />
                </div>
                <div className="flex flex-col justify-center gap-6 sm:pt-0 max-w-lg mx-12 mt-[-50px]">
                  <h1 className="text-3xl sm:text-4xl font-bold">Sign Up</h1>
                  <p className="text-sm text-gray-500 tracking-wide leading-5">
                    Let’s get you all set up so you can access your personal account.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                        required
                      />
                    </div>
                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <label
                        htmlFor="terms"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        I agree with the{" "}
                        <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                          terms and conditions
                        </a>.
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Submit"}
                    </button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </form>

                  <Link to={{pathname:"/"}}>
                <div className="flex items-center mt-2" >
                  
    
                <label
                        htmlFor="signupCheckbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Already have an account?<span className="text-red-600">Login</span> 
                      </label>
                      
                    </div>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
