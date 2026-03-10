import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function ProviderListing() {
  const { serviceId } = useParams();
  const [providers, setProviders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/provider/${serviceId}/viewProviders`,
        { withCredentials: true }
      );
      setProviders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBook = (provider) => {
    navigate("/request-service", {
      state: {
        providerId: provider.userId._id,
        serviceId: provider.serviceOfferedId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-slate-800">
        Available Providers
      </h1>

      {providers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <h2 className="text-2xl font-semibold text-slate-600">
            No Providers Currently Available
          </h2>
          <p className="text-slate-400 mt-2">
            Please check back later or try another service.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <div
              key={provider._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 p-6 border border-slate-200"
            >
              {/* Profile Avatar */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-full bg-yellow-500 text-white flex items-center justify-center text-2xl font-bold">
                  {provider.userId.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    {provider.userId.name}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {provider.experienceYears} Years Experience
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-slate-600 mb-5">
                <p>📍 Area: {provider.serviceAreas}</p>
                <p>💰 Price: AED {provider.price}</p>
                <p>📞 {provider.userId.phone}</p>
              </div>

              {/* Button */}
              <button
                onClick={() => handleBook(provider)}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition duration-300"
              >
                Book This Provider
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProviderListing;
