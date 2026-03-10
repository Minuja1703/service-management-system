import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, LogOut } from "lucide-react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";

function ClientDashboard() {
  const requestsRef = useRef(null);

  const navigate = useNavigate();

  const [requestCount, setRequestCount] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    accepted: 0,
    pending: 0,
    cancelled: 0,
    clientName: "",
    clientReqs: [],
  });

  useEffect(() => {
    fetchRequestCount();
  }, []);

  const fetchRequestCount = async () => {
    try {
      await axios.get(`${BASE_URL}/auth/me`, { withCredentials: true });

      const res = await axios.get(`${BASE_URL}/client/me/dashboard`, {
        withCredentials: true,
      });
      setRequestCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      navigate("/login");
      toast.success("Logout Successful.");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handlePayment = async (req) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/payments/create-checkout-session`,
        { serviceRequestId: req.serviceReqId, amount: req.totalAmount },
        { withCredentials: true }
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Payment failed.");
    }
  };

  const scrollToRequests = () => {
    requestsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 to-slate-200 scroll-smooth">
      <aside className="w-72 p-8 border-r bg-white/70 border-white shadow-2xl hidden md:flex flex-col justify-between">
        <nav className="space-y-4 text-slate-700">
          <Link className="flex gap-4 px-4 py-3 rounded-2xl bg-yellow-500 text-white shadow-lg shadow-yellow-500/30">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            onClick={scrollToRequests}
            className="flex gap-4 px-3 py-3 rounded-2xl hover:text-yellow-600 hover:bg-yellow-100 transition-all duration-300"
          >
            <ClipboardList size={20} />
            My Requests
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="cursor-pointer flex gap-4 px-3 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 md:p-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Welcome Back, {requestCount.clientName} 👋
            </h1>
            <p className="text-slate-500 mt-2">
              Here's what's happening with your services today.
            </p>
          </div>

          <div className="text-2xl flex items-center justify-center font-bold bg-yellow-500 text-white rounded-full w-11 h-11 shadow-md">
            {requestCount.clientName.charAt(0)}
          </div>
          {/* <img
              src="https://i.pravatar.cc/100"
              alt="Profile Image"
              className="border-2 border-yellow-400 rounded-full w-11 h-11 shadow-md"
            /> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/70 rounded-3xl p-8 shadow-xl hover:scale-105 transition-all duration-300 border border-white/40">
            <p className="text-slate-600">Total Requests</p>
            <h1 className="text-4xl font-bold mt-3">{requestCount.total}</h1>
          </div>

          <div className="text-white bg-gradient-to-r from-green-500 to-green-800 rounded-3xl p-8 shadow-xl hover:scale-105 transition-all duration-300 border border-white/40">
            <p className="font-semibold">Completed</p>
            <h1 className="text-4xl font-bold mt-3">
              {requestCount.completed}
            </h1>
          </div>

          <div className="text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-xl hover:scale-105 transition-all duration-300">
            <p className="font-semibold">Pending</p>
            <h1 className="text-4xl font-bold mt-3">{requestCount.pending}</h1>
          </div>
        </div>

        <div className="mb-12">
          <Link to="/services">
            <button className="px-8 py-4 font-semibold rounded-2xl text-white bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/40 hover:scale-105 transition-all duration-300 cursor-pointer">
              + Request New Service
            </button>
          </Link>
        </div>

        <div
          ref={requestsRef}
          className="bg-white/70 rounded-3xl p-8 shadow-xl border border-white/40"
        >
          <h1 className="font-semibold text-2xl text-slate-800 mb-8">
            Recent Service Requests
          </h1>

          <div className="space-y-6">
            {requestCount.clientReqs.length === 0 ? (
              <p className="text-slate-500">No Service requests yet.</p>
            ) : (
              requestCount.clientReqs.map((req) => (
                <div
                  key={req.serviceReqId}
                  className={`flex items-center justify-between p-5 rounded-2xl 
                  ${
                    req.serviceStatus === "Pending"
                      ? "hover:bg-yellow-50"
                      : req.serviceStatus === "Completed"
                      ? "hover:bg-green-50"
                      : req.serviceStatus === "Accepted"
                      ? "hover:bg-blue-50"
                      : req.serviceStatus === "Cancelled"
                      ? "hover:bg-red-50"
                      : req.serviceStatus === "In-progress"
                      ? "hover:bg-indigo-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {req.serviceName}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {new Date(req.ServiceDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <span
                      className={`rounded-full px-5 py-2 text-sm font-semibold ${
                        req.serviceStatus === "Completed"
                          ? "bg-green-100 text-green-600"
                          : req.serviceStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : req.serviceStatus === "Accepted"
                          ? "bg-blue-100 text-blue-600"
                          : req.serviceStatus === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : req.serviceStatus === "In-progress"
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {req.serviceStatus}
                    </span>

                    {req.serviceStatus === "Completed" &&
                      req.paymentStatus === "Pending" && (
                        <button
                          onClick={() => handlePayment(req)}
                          className="font-semibold text-sm text-white rounded-xl px-4 py-2 bg-gradient-to-r from-indigo-700 to bg-indigo-900 hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
                        >
                          Proceed to pay
                        </button>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClientDashboard;
