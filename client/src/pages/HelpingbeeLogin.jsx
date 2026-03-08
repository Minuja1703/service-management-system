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
    <div className="flex items-center justify-center gap-8">
      <img
        src={hbSignupImg}
        alt=""
        className="h-[400px] w-auto object-contain rounded"
      />

      <div className="flex flex-col items-center justify-center my-15">
        <div className="backdrop-blur-md w-full max-w-md shadow-[0_0_25px_rgba(0,0,0,0.25)] border-black/5 rounded-2xl p-8  bg-white/60">
          <h2 className="text-center font-semibold text-3xl mb-5">
            Welcome Back
          </h2>

          <p className="text-slate-800 mb-6 font-medium text-center">
            Please log in to continue.
          </p>

          <div className="space-y-2">
            <form className="space-y-5" onSubmit={handleSubmit}>
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
          </div>

          <p className="mt-6 text-center">
            Don't have an account ?
            <span className="text-amber-600 font-medium hover:underline">
              <Link to="/helpingbee-signup"> Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelpingbeeLogin;
