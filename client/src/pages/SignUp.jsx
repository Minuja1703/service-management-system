import React, { useState } from "react";
import logo from "../assets/images/bee.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

function SignUp() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "client",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/signup`, input, {
        withCredentials: true,
      });

      navigate("/login");

      toast.success("Successfully registered.");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 flex items-center justify-center gap-5 bg-gradient-to-br from-orange-100 via-black/5 to-orange-400">
      <Link
        to="/"
        className="absolute text-sm sm:text-base top-4 left-4 sm:left-6 sm:top-6 flex items-center gap-2 text-slate-600 hover:text-yellow-800 transition"
      >
        <ArrowLeft size={18} />
        Home
      </Link>

      <div className="w-full max-w-md flex flex-col items-center gap-4 sm:gap-5">
        <img
          src={logo}
          alt="Helper Bee Logo"
          className="h-12 sm:h-[60px] w-auto object-contain"
        />

        <div className="backdrop-blur-md w-full max-w-md border rounded-2xl p-5 sm:p-8 shadow-xl border-black/5 bg-white/90">
          <form
            className="space-y-4 sm:space-y-5 mt-2 sm:mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm sm:text-base border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm sm:text-base border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
            />

            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
              className="border text-sm sm:text-base rounded-xl w-full px-4 py-3 placeholder-slate-600 bg-black/5 border-white/10"
            />

            <input
              type="text"
              name="phone"
              required
              placeholder="Phone"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm sm:text-base border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-5 sm:mt-6 text-center text-sm sm:text-base">
            Already have an account ?
            <Link
              to="/login"
              className="text-amber-600 font-medium hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
