import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Wrench } from "lucide-react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Services() {
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/service`);
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-black/5 to-orange-400 px-4 sm:px-6 lg:px-10 py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-yellow-600">
        Services
      </h1>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services
          .filter((service) => service.isActive)
          .map((service) => (
            <div
              key={service._id}
              className="group bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-white/40"
            >
              <div className="relative overflow-hidden h-40 sm:h-48 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600">
                <Wrench
                  size={50}
                  className="sm:w-[70px] sm:h-[70px] text-white opacity-90 group-hover:scale-110 transition"
                />

                <h2 className="absolute bottom-3 left-4 text-white text-lg sm:text-xl font-semibold">
                  {service.name}
                </h2>
              </div>

              <div className="p-4 sm:p-6">
                <p className="text-slate-600 text-sm sm:text-base mb-4 sm:mb-6">
                  {service.description}
                </p>
                <button
                  onClick={() => navigate(`/providers/${service._id}`)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 active:scale-95 sm:hover:scale-105 transform transition duration-300 text-white py-2.5 sm:py-3 rounded-xl font-semibold shadow-md text-sm sm:text-base"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Services;
