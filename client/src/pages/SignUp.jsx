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
    <div
    // className="w-full min-h-screen bg-cover bg-center px-5 flex items-center justify-center"
    // style={{ backgroundImage: `url(${coverImg})` }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-orange-100 via-black/5 to-orange-400">
        {/* Back to Home */}
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-yellow-800 transition"
        >
          <ArrowLeft size={18} />
          Home
        </Link>
        <img src={logo} alt="" className="h-[60px] w-auto object-contain" />
        <div className="backdrop-blur-md w-full max-w-md border rounded-2xl p-8 shadow-xl border-black/5 bg-white">
          <form className="space-y-6 mt-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
            />

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

            <input
              type="text"
              name="phone"
              required
              placeholder="Phone"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
            />

            <button
              type="submit"
              className="w-full border py-3 rounded-xl bg-yellow-600 text-white font-semibold cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center">
            Already have an account ?
            <span className="text-amber-600 font-medium hover:underline">
              <Link to="/login"> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
