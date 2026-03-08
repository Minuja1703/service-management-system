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
    <div className="flex items-center justify-center gap-8">
      <img
        src={hbSignupImg}
        alt=""
        className="h-[400px] w-auto object-contain rounded"
      />

      <div className="flex flex-col items-center justify-center my-15">
        <div className="backdrop-blur-md w-full max-w-md shadow-[0_0_25px_rgba(0,0,0,0.25)] border-black/5 rounded-2xl p-8  bg-white/60">
          <h2 className="text-center font-semibold text-3xl mb-5">
            Start your earning journey
          </h2>

          <p className="text-slate-800 mb-6 font-medium">
            Transform your skills into steady income. Register now!
          </p>

          <div className="space-y-2">
            <label htmlFor="serviceOfferedId" className="text-lg text-slate-600 block">
              Select Service
            </label>
            <select
              name="serviceOfferedId"
              id="serviceOfferedId"
              className="w-full px-4 py-3 border text-slate-600 rounded-xl bg-black/5 border-white/10"
              required
              onChange={handleChange}
            >
              <option value="" className="text-black">
                Select
              </option>

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
              className="mt-3 w-full border py-3 rounded-xl bg-yellow-600 text-white font-semibold cursor-pointer"
            >
              Get Started
            </button>
          </div>

          <p className="mt-6 text-center">
            Already have an account ?
            <span className="text-amber-600 font-medium hover:underline">
              <Link to="/helpingbee-login"> Login</Link>
            </span>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 px-4 flex items-center justify-center">
          <div className="max-h-[90vh] w-full max-w-2xl shadow-2xl p-8 rounded-2xl relative overflow-y-auto bg-white rounded-2xl">
            <h1 className="text-center text-2xl font-bold mb-6">
              Create your account
            </h1>

            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer text-xl"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <form className="space-y-5" onSubmit={handleSubmit}>
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

              {/* <select className="w-full px-4 py-3 border rounded-xl bg-black/5 border-white/10 text-slate-600">
                <option value="" disabled>
                  Select Service
                </option>
                <option>Plumbing</option>
                <option>Gardening</option>
                <option>Cleaning</option>
              </select> */}

              <input
                type="number"
                name="price"
                required
                placeholder="Price"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              />

              <input
                type="text"
                name="experienceYears"
                required
                placeholder="Experience Years"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              />

              <textarea
                className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
                name="serviceAreas"
                cols="30"
                rows="5"
                placeholder="Service Area"
                required
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="w-full border py-3 rounded-xl bg-yellow-600 text-white font-semibold cursor-pointer"
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
