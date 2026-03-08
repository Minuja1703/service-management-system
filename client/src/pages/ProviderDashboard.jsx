import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import toast from "react-hot-toast";

function ProviderDashboard() {
  const clientRequestRef = useRef(null);

  const profileRef = useRef(null);

  const navigate = useNavigate();

  const [availability, setAvailability] = useState(true);

  const [dashboardData, setDashboardData] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    requests: [],
    providerProfile: {},
    totalEarnings: 0,
  });

  useEffect(() => {
    const fetchProviderDashboardData = async () => {
      const res = await axios.get(`${BASE_URL}/provider/me/dashboard`, {
        withCredentials: true,
      });

      setDashboardData(res.data);
    };

    fetchProviderDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      navigate("/login");
      toast.success("Logout successful.");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const scrollToClientRequest = () => {
    clientRequestRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProfile = () => {
    profileRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 scroll-smooth">
      {/* SIDEBAR */}
      <aside className="w-72 text-amber-600 bg-slate-50 p-6 flex flex-col justify-between">
        <nav className="space-y-6 text-lg">
          <Link className="flex gap-4 px-4 py-3 rounded-2xl bg-yellow-500 text-white shadow-lg shadow-yellow-500/30">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            onClick={scrollToClientRequest}
            className="flex gap-4 px-3 py-3 rounded-2xl hover:text-yellow-600 hover:bg-yellow-100 transition-all duration-300"
          >
            <ClipboardList size={20} />
            Requests
          </Link>

          <Link
            onClick={scrollToProfile}
            className="flex gap-4 px-3 py-3 rounded-2xl hover:text-yellow-600 hover:bg-yellow-100 transition-all duration-300"
          >
            <User size={20} />
            Profile
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 space-y-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Welcome Back</h1>
            <p className="text-slate-500 mt-1">
              Manage your services and earnings
            </p>
          </div>

          {/* AVAILABILITY TOGGLE */}
          {/* <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow">
            <span className="font-medium">Availability</span>
            <button
              onClick={() => setAvailability(!availability)}
              className={`w-14 h-8 rounded-full relative transition ${
                availability ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition ${
                  availability ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div> */}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6">
          <Stat title="Total Requests" value={dashboardData.totalRequests} />
          <Stat title="Pending" value={dashboardData.pendingRequests} />
          <Stat title="Completed" value={dashboardData.completedRequests} />
          <Stat
            title="Total Earnings"
            value={`₹${dashboardData.totalEarnings}`}
            highlight
          />
        </div>

        {/* REQUESTS */}
        <section
          ref={clientRequestRef}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Recent Service Requests
          </h2>

          <div className="space-y-4">
            {dashboardData?.requests.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))}
          </div>
        </section>

        {/* PROFILE */}
        <section
          ref={profileRef}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

          <div className="grid grid-cols-2 gap-6">
            <ProfileField
              label="Service"
              value={dashboardData?.providerProfile?.serviceOfferedId?.name}
            />
            <ProfileField
              label="Price"
              value={`₹${dashboardData.providerProfile.price} / job`}
            />
            <ProfileField
              label="Experience"
              value={`${dashboardData?.providerProfile?.experienceYears} Year(s)`}
            />
            <ProfileField
              label="Service Areas"
              value={`${dashboardData?.providerProfile?.serviceAreas}`}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProviderDashboard;

/* ---------- COMPONENTS ---------- */

const Stat = ({ title, value, highlight }) => (
  <div
    className={`rounded-2xl p-6 shadow-lg transition ${
      highlight
        ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
        : "bg-white"
    }`}
  >
    <p className="opacity-80">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
  </div>
);

const RequestCard = ({ request }) => {
  const [currentStatus, setCurrentStatus] = useState(request.status);

  const updateStatus = async (nextStatus) => {
    try {
      await axios.patch(
        `${BASE_URL}/service-request/${request._id}/status`,
        { status: nextStatus },
        { withCredentials: true }
      );

      setCurrentStatus(nextStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const getNextStatus = () => {
    if (currentStatus === "Pending") {
      return "Accepted";
    }

    if (currentStatus === "Accepted") {
      return "In-progress";
    }

    if (currentStatus === "In-progress") {
      return "Completed";
    }

    return null;
  };

  const nextStatus = getNextStatus();

  return (
    <div className="flex justify-between items-center bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
      <div>
        <h3 className="font-semibold text-lg">{request?.clientId?.name}</h3>
        <p className="text-slate-500 text-sm">{`${
          request?.description
        } • ${new Date(request?.scheduledDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`}</p>
        <p className="text-slate-500 text-sm">{`Area: ${request?.address}`}</p>
      </div>

      <div className="flex items-center gap-4">
        {currentStatus === "Pending" && (
          <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
            {currentStatus}
          </span>
        )}

        {currentStatus === "Accepted" && (
          <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
            {currentStatus}
          </span>
        )}

        {currentStatus === "In-progress" && (
          <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
            {currentStatus}
          </span>
        )}

        {currentStatus === "Completed" && (
          <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            {currentStatus}
          </span>
        )}

        {currentStatus === "Cancelled" && (
          <span className="px-4 py-1 rounded-full bg-red-100 text-red-700 text-sm">
            {currentStatus}
          </span>
        )}

        {currentStatus === "Pending" && (
          <button
            onClick={() => updateStatus("Accepted")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
          >
            Accept
          </button>
        )}

        {currentStatus === "Accepted" && (
          <button
            onClick={() => updateStatus("In-progress")}
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-xl transition"
          >
            Start Work
          </button>
        )}

        {currentStatus === "In-progress" && (
          <button
            onClick={() => updateStatus("Completed")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
          >
            Completed
          </button>
        )}

        {currentStatus === "Pending" && (
          <button
            onClick={() => updateStatus("Cancelled")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-slate-500">{label}</p>
    <h3 className="font-semibold mt-1">{value}</h3>
  </div>
);
