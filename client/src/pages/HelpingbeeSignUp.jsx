import React, { useState, useEffect } from "react";
import hbSignupImg from "../assets/images/image1.avif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";

function HelpingbeeSignUp() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [services, setServices] = useState([]);

  const [input, setInput] = useState({
    serviceOfferedId: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    price: "",
    experienceYears: "",
    serviceAreas: "",
    role: "provider",
  });

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get(`${BASE_URL}/service/`, {
        withCredentials: true,
      });
      setServices(res.data);
    };
    fetchServices();
  }, []);

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

      navigate("/helpingbee-login");

      toast.success("Successfully registered.");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 px-4 py-8 bg-gradient-to-br from-orange-200 via-black/5 to-orange-400">
      <div className="hidden md:flex justify-center">
        <img
          src={hbSignupImg}
          alt="Helping Bee Sign Up Image"
          className="max-h-[400px] w-auto object-contain rounded-xl"
        />
      </div>

      <div className="w-full max-w-md">
        <div className="backdrop-blur-md max-w-md shadow-[0_0_25px_rgba(0,0,0,0.25)] p-6 sm:p-8 border-black/5 rounded-2xl bg-white/70">
          <h2 className="text-center font-semibold text-2xl sm:text-3xl mb-4">
            Start your earning journey
          </h2>

          <p className="text-slate-800 mb-6 text-center font-medium text-sm sm:text-base">
            Transform your skills into steady income. Register now!
          </p>

          <div className="space-y-3">
            <label
              htmlFor="serviceOfferedId"
              className="text-sm sm:text-base text-slate-600 block"
            >
              Select Service
            </label>
            <select
              name="serviceOfferedId"
              id="serviceOfferedId"
              className="w-full px-4 py-3 border rounded-xl text-sm sm:text-base bg-black/5 border-white/10"
              required
              onChange={handleChange}
            >
              <option value="">Select</option>

              {services.map((service) => (
                <option
                  key={service._id}
                  value={service._id}
                  className="text-black"
                >
                  {service.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowModal(true)}
              className="mt-3 w-full border py-3 rounded-xl bg-yellow-600 text-white font-semibold cursor-pointer hover:bg-yellow-700 transition"
            >
              Get Started
            </button>
          </div>

          <p className="mt-6 text-center text-sm sm:text-base">
            Already have an account ?
            <Link
              to="/helpingbee-login"
              className="font-medium text-amber-600 hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 px-3 sm:px-4 flex items-center justify-center">
          <div className="max-h-[90vh] w-full max-w-2xl shadow-2xl p-5 sm:p-8 rounded-2xl relative overflow-y-auto bg-white rounded-2xl">
            <h1 className="text-center text-xl sm:text-2xl font-bold mb-5">
              Create your account
            </h1>

            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-lg"
              onClick={() => setShowModal(false)}
            >
              X
            </button>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                onChange={handleChange}
                className="w-full text-sm sm:text-base px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                onChange={handleChange}
                className="w-full text-sm sm:text-base px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              />

              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                onChange={handleChange}
                className="border rounded-xl w-full text-sm sm:text-base px-4 py-3 placeholder-slate-600 bg-black/5 border-white/10"
              />

              <input
                type="text"
                name="phone"
                required
                placeholder="Phone"
                onChange={handleChange}
                className="w-full text-sm sm:text-base px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              />

              <input
                type="number"
                name="price"
                required
                placeholder="Price"
                onChange={handleChange}
                className="w-full text-sm sm:text-base px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              />

              <input
                type="text"
                name="experienceYears"
                required
                placeholder="Experience Years"
                onChange={handleChange}
                className="w-full text-sm sm:text-base px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              />

              <textarea
                className="w-full text-sm sm:text-base px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
                name="serviceAreas"
                cols="30"
                rows="5"
                placeholder="Service Area"
                required
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpingbeeSignUp;
