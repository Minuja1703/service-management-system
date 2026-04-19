import axios from "axios";
import React, { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RequestService() {
  const location = useLocation();
  const navigate = useNavigate();

  const { providerId, serviceId } = location.state || {};

  const [input, setInput] = useState({
    description: "",
    address: "",
    scheduledDate: "",
    serviceId: serviceId || "",
    providerId: providerId || "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/service-request/`, input, {
        withCredentials: true,
      });

      navigate("/client-dashboard");
      toast.success("Service booked successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Service booking failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-6 md:py-10 bg-gradient-to-br from-slate-100 to-white">
      <div className="backdrop-blur-md w-full max-w-md sm:max-w-lg md:max-w-xl border rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_0_25px_rgba(0,0,0,0.25)] border-black/5 bg-white/70">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-center font-bold text-slate-800 mb-4 sm:mb-6">
          Book Service
        </h2>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="description"
              className="text-sm sm:text-base block font-medium mb-1"
            >
              Task Description
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl text-sm sm:text-base placeholder-slate-500 bg-black/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              name="description"
              cols="30"
              rows="5"
              id="description"
              placeholder="Task Description"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="address"
              className="text-sm sm:text-base block mb-1 font-medium"
            >
              Your Address
            </label>
            <textarea
              className="w-full px-3 text-sm sm:text-base sm:px-4 py-2.5 sm:py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              name="address"
              id="address"
              cols="30"
              rows="5"
              placeholder="Your Address"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="text-sm sm:text-base block mb-1 font-medium">
              Scheduled Date
            </label>
            <input
              type="date"
              name="scheduledDate"
              required
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl text-sm sm:text-base bg-black/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 border sm:py-3 text-sm sm:text-base rounded-xl bg-yellow-600 text-white font-semibold hover:scale-105 transition"
          >
            Book Service
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestService;
