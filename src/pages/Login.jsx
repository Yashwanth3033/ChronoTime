import React, { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../services/apiAuth";
import logo from "../assets/versache logo.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      await login(loginData);
      toast.success("Logged In Successfully");
      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      {/* Logo & Heading */}
      <div className="text-center mb-6">
        <div className="flex items-center space-x-3 justify-center mb-3">
          <img
            src={logo}
            alt="company logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Log in to ChronoTime
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-300 text-sm">
          Please enter your credentials to continue
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md space-y-6"
      >
        {/* Email Field */}
        <div className="flex flex-col gap-y-1">
          <label
            htmlFor="email"
            className="font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-violet-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-y-1 relative">
          <label
            htmlFor="password"
            className="font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter your password"
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="px-4 py-2 pr-10 border rounded-md outline-none focus:ring-2 focus:ring-violet-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition-all duration-200 disabled:animate-pulse cursor-pointer disabled:cursor-not-allowed"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
