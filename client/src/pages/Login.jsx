import React, { useState } from "react";
import coverImg from "../assets/images/image1.avif";
import logo from "../assets/images/bee.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";

function Login() {
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

      const userRole = res.data.user.role;

      if (userRole === "client") {
        navigate("/client-dashboard");
        toast.success("Login successful.");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
        toast.success("Login successful.");
      } else if (userRole === "provider") {
        toast.error("Incorrect Credentiala.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login Failed.");
    }
  };

  return (
    <div
    // className="w-full min-h-screen bg-cover bg-center px-5 flex items-center justify-center"
    // style={{ backgroundImage: `url(${coverImg})` }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center gap-5">
        <img src={logo} alt="" className="h-[60px] w-auto object-contain" />
        <div className="backdrop-blur-md w-full max-w-md border  rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.25)] border-black/5 bg-white/60">
          <h2 className="text-center font-semibold text-3xl mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-slate-300 mb-6">Sign in to continue</p>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
            />

            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
              className="border rounded-xl w-full px-4 py-3 placeholder-slate-600 bg-black/5 border-white/10"
            />

            <button
              type="submit"
              className="w-full border py-3 rounded-xl bg-yellow-600 text-white font-semibold cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center">
            Don't have an account ?
            <span className="text-amber-600 font-medium hover:underline">
              <Link to="/signup"> Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
