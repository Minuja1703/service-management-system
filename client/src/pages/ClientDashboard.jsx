import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, LogOut, Menu } from "lucide-react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";

function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <aside
        className={`fixed md:static w-64 sm:w-72 z-40 backdrop-blur-lg transform p-5 sm:p-6 h-screen md:h-auto top-0 left-0 bg-white/90 border-white shadow-xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between">
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
            className="flex gap-4 px-3 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed bg-black/30 md:hidden z-30 inset-0"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 md:py-10">
        <div className="md:hidden flex items-center gap-5 mb-5">
          <button
            className="bg-white rounded-lg p-2 shadow"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={28} />
          </button>
        </div>

        <div className="flex md:flex-row md:justify-between md:items-center mb-8 md:mb-12 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
              Welcome Back, {requestCount.clientName} 👋
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Here's what's happening with your services today.
            </p>
          </div>
          <div className="text-lg sm:text-xl flex items-center justify-center font-bold bg-yellow-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-md">
            {requestCount.clientName.charAt(0)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="bg-white/70 rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl hover:scale-105 transition-all duration-300 border border-white/40">
            <p className="text-slate-600">Total Requests</p>
            <h1 className="text-4xl font-bold mt-3">{requestCount.total}</h1>
          </div>

          <div className="text-white bg-gradient-to-r from-green-500 to-green-800 rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl hover:scale-105 transition-all duration-300 border border-white/40">
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

        <div className="mb-10">
          <Link to="/services">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-2xl text-white bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/40 hover:scale-105 transition-all duration-300">
              + Request New Service
            </button>
          </Link>
        </div>

        <div
          ref={requestsRef}
          className="bg-white/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/40"
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
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl 
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

                  <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
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
                          className="font-semibold text-sm text-white rounded-xl px-4 py-2 bg-gradient-to-r from-indigo-700 to-indigo-900 hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
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
