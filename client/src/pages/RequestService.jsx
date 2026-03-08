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

      navigate("/services");
      toast.success("Service booked successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Service booking failed.");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 my-9">
        <div className="backdrop-blur-md w-full max-w-md border rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.25)] border-black/5 bg-white/60">
          <form className="space-y-6 mt-5" onSubmit={handleSubmit}>
            <label htmlFor="description" className="text-lg block">
              Task Description
            </label>
            <textarea
              className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              name="description"
              cols="30"
              rows="5"
              id="description"
              placeholder="Task Description"
              required
              onChange={handleChange}
            ></textarea>

            <label htmlFor="address" className="text-lg block">
              Your Address
            </label>
            <textarea
              className="w-full px-4 py-3 border rounded-xl placeholder-slate-600 bg-black/5 border-white/10"
              name="address"
              id="address"
              cols="30"
              rows="5"
              placeholder="Your Address"
              required
              onChange={handleChange}
            ></textarea>

            <label className="text-lg block">Scheduled Date</label>
            <input
              type="date"
              name="scheduledDate"
              required
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full border py-3 rounded-xl bg-yellow-600 text-white font-semibold cursor-pointer"
            >
              Book Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestService;
