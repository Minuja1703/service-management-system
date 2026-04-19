import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Lottie from "lottie-react";
import Payment from "../assets/lottie/Payment.json";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) return;

      try {
        await axios.get(
          `${BASE_URL}/payments/verify-payment?session_id=${sessionId}`,
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 md:p-10 shadow-2xl rounded-2xl text-center bg-white">
        <Lottie
          animationData={Payment}
          loop={false}
          className="w-52 sm:w-64 md:w-80 mx-auto"
        />
        <h1 className="text-green-700 text-2xl sm:text-3xl md:text-4xl mt-4 font-bold">
          Payment Successful 🎉
        </h1>
        <p className="text-slate-700 font-semibold mt-3 text-sm sm:text-base">
          Thank you for your payment.
        </p>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          Come back again. We are right here for you.
        </p>
        <Link to="/client-dashboard">
          <button className="mt-6 w-full sm:w-auto px-6 py-3 bg-indigo-700 text-white rounded-xl shadow-lg hover:bg-indigo-800 transition">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
