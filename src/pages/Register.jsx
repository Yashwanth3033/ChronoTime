import React, { useState } from "react";
import logo from "../assets/versache logo.jpg";
import toast from "react-hot-toast";
import {register} from "../services/apiAuth"; 
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [loading, setLoading] = useState(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [registerDetails, setRegisterDetails] = useState({
    name: {value: ""},
    email: {value: ""},
    password: {value: ""},
    repeatedPassword: {value: ""}
  });

  const navigate = useNavigate();
  const { name, email, password, repeatedPassword } = registerDetails;

  const formErrors = !(name?.value && email?.value && password?.value && repeatedPassword?.value) || (name?.error || email?.error || password?.error || repeatedPassword?.error)

  const handleRegister = async function (e) {
    e.preventDefault();

    if (formErrors) {
      toast.error("Please fill the form with valid data");
      return;
    }

    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
    }

    try {
      setLoading(true);
      await register(data)
      toast.success("Registered Successfully");
      navigate("/login")
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
    
    


  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={logo}
            alt="company logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Register for Chrono Time
          </h2>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            className="outline-none mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your name"
            onChange={(e) =>
              setRegisterDetails((prev) => ({
                ...prev,
                name: {
                  value: e.target.value,
                  error: e.target.value === "" && "Name is required!",
                },
              }))
            }
          />
          <p className="text-red-500 text-sm">{name?.error}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email ID
          </label>
          <input
            type="email"
            className="outline-none mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="example@mail.com"
            onChange={(e) =>
              setRegisterDetails((prev) => ({
                ...prev,
                email: {
                  value: e.target.value,
                  error:
                    (e.target.value === "" || !emailRegex.test(e.target.value)) && "Enter a valid email addres",
                },
              }))
            }
          />
          <p className="text-red-500 text-sm">{email?.error}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="outline-none mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter password"
            onChange={(e) =>
              setRegisterDetails((prev) => ({
                ...prev,
                password: { value: e.target.value, error: e.target.value.length < 8 && "Password should atleast be 8 characters long." },
              }))
            }
          />
          <p className="text-red-500 text-sm">{password?.error}</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            className="outline-none mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Confirm password"
            onChange={(e) =>
              setRegisterDetails((prev) => ({
                ...prev,
                repeatedPassword: {value: e.target.value, error: !(e.target.value === password.value) && "Passwords do not match"},
              }))
            }
          />
          <p className="text-red-500 text-sm">{repeatedPassword?.error}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition cursor-pointer disabled:bg-blue-600/30 disabled:cursor-not-allowed ${loading && "animate-pulse"}`}
          disabled={formErrors || loading}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
