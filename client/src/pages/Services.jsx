import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Wrench } from "lucide-react";

function Services() {
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/service");
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-10">
      <h1 className="text-5xl font-bold text-center mb-14 text-slate-800">
        Explore Our Services
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {services
          .filter((service) => service.isActive)
          .map((service) => (
            <div
              key={service._id}
              className="group relative bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden border border-white/40"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-52">
                <div className="h-52 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 text-white group-hover:scale-120 transition">
                  <Wrench size={70} className="opacity-90" />
                </div>
                {/* <img
                  src={
                    "https://images.unsplash.com/photo-1521791136064-7986c2920216"
                  }
                  alt={service.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                /> */}

                {/* Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> */}

                {/* Title on Image */}
                <h2 className="absolute bottom-4 left-4 text-white text-2xl font-semibold">
                  {service.name}
                </h2>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-slate-600 mb-6">{service.description}</p>

                <button
                  onClick={() => navigate(`/providers/${service._id}`)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105 transform transition duration-300 text-white py-3 rounded-xl font-semibold shadow-md"
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
