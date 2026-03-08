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
    <div className="flex items-center h-screen justify-center">
      <div className="p-10 shadow-2xl rounded-2xl text-center">
        <Lottie animationData={Payment} loop={false} className="w-80 md:w-96" />
        <h1 className="text-green-700 text-3xl font-bold">
          Payment Successful 🎉
        </h1>
        <p className="text-slate-700 font-semibold mt-4">
          Thank you for your payment.
        </p>
        <p className="text-slate-800 mt-2">
          Come back again. We are right here for you.
        </p>
        <Link to="/client-dashboard">
          <button className="cursor-pointer mt-6 px-6 py-3 bg-indigo-700 text-white rounded-2xl shadow-2xl">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
