import React, { useState } from "react";
import hbSignupImg from "../assets/images/image1.avif";
import { Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function HelpingbeeLogin() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, input, {
        withCredentials: true,
      });

      const role = res.data.user.role;

      if (role === "provider") {
        navigate("/provider-dashboard");
        toast.success("Login Successful");
      } else if (role === "client") {
        toast.error("Incorrect Credentials");
      } else if (role === "admin") {
        toast.error("Incorrect Credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Login Failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 px-4 py-8 bg-gradient-to-br from-orange-200 via-black/5 to-orange-400">
      <div className="hidden md:flex justify-center">
        <img
          src={hbSignupImg}
          alt="Helping Bee Login Image"
          className="max-h-[400px] w-auto object-contain rounded-xl"
        />
      </div>

      <div className="w-full max-w-md">
        <div className="backdrop-blur-md max-w-md shadow-[0_0_25px_rgba(0,0,0,0.25)] border-black/5 rounded-2xl p-6 sm:p-8 bg-white/70">
          <h2 className="text-center font-semibold text-2xl sm:text-3xl mb-4">
            Welcome Back
          </h2>

          <p className="text-slate-800 mb-6 font-medium text-center text-sm sm:text-base">
            Log in to continue your service journey and grow your earnings.
          </p>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10 text-sm sm:text-base"
            />

            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
              className="border rounded-xl w-full px-4 py-3 placeholder-slate-600 bg-black/5 border-white/10 text-sm sm:text-base"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-yellow-600 text-white font-semibold cursor-pointer hover:bg-yellow-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm sm:text-base">
            Don't have an account ?
            <Link
              to="/helpingbee-signup"
              className="text-amber-600 font-medium hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelpingbeeLogin;
