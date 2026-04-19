import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import toast from "react-hot-toast";

function ProviderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    fetchProviderDashboardData();
  }, []);

  const fetchProviderDashboardData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/provider/me/dashboard`, {
        withCredentials: true,
      });

      setDashboardData(res.data);
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

      <aside
        className={`fixed md:static h-screen md:h-auto shadow-xl top-0 left-0 w-64 sm:w-72 z-40 text-amber-600 bg-slate-50 p-5 sm:p-6 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between">
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
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}

      <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 md:py-10 space-y-8">
        <div className="md:hidden flex items-center gap-5 mb-6">
          <button
            className="p-2 shadow bg-white rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
              Welcome Back
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Manage your services and earnings
            </p>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Stat title="Total Requests" value={dashboardData.totalRequests} />
          <Stat title="Pending" value={dashboardData.pendingRequests} />
          <Stat title="Completed" value={dashboardData.completedRequests} />
          <Stat
            title="Total Earnings"
            value={`AED ${dashboardData.totalEarnings}`}
            highlight
          />
        </div>

        {/* REQUESTS */}

        <section
          ref={clientRequestRef}
          className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Recent Service Requests
          </h2>

          <div className="space-y-4">
            {dashboardData?.requests.length === 0 ? (
              <p className="text-center text-slate-600 py-6">
                No Requests available.
              </p>
            ) : (
              dashboardData?.requests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  refreshDashboard={fetchProviderDashboardData}
                />
              ))
            )}
          </div>
        </section>

        {/* PROFILE */}

        <section
          ref={profileRef}
          className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <ProfileField
              label="Service"
              value={dashboardData?.providerProfile?.serviceOfferedId?.name}
            />
            <ProfileField
              label="Price"
              value={`AED ${dashboardData.providerProfile.price} / job`}
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
    className={`rounded-2xl p-5 sm:p-6 shadow-lg transition ${
      highlight
        ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
        : "bg-white"
    }`}
  >
    <p className="opacity-80">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
  </div>
);

const RequestCard = ({ request, refreshDashboard }) => {
  const [currentStatus, setCurrentStatus] = useState(request.status);

  const updateStatus = async (nextStatus) => {
    try {
      await axios.patch(
        `${BASE_URL}/service-request/${request._id}/status`,
        { status: nextStatus },
        { withCredentials: true }
      );

      setCurrentStatus(nextStatus);

      toast.success(`Service ${nextStatus}.`);

      refreshDashboard();
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
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 shadow hover:shadow-lg transition">
      <div>
        <h3 className="font-semibold text-lg">{request?.clientId?.name}</h3>
        <p className="text-slate-500 text-sm">{`${
          request?.description
        } • ${new Date(request?.scheduledDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`}</p>
        <p className="text-slate-500 text-sm break-words">{`Area: ${request?.address}`}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition cursor-pointer"
          >
            Accept
          </button>
        )}

        {currentStatus === "Accepted" && (
          <button
            onClick={() => updateStatus("In-progress")}
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-xl transition cursor-pointer"
          >
            Start Work
          </button>
        )}

        {currentStatus === "In-progress" && (
          <button
            onClick={() => updateStatus("Completed")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition cursor-pointer"
          >
            Completed
          </button>
        )}

        {currentStatus === "Pending" && (
          <button
            onClick={() => updateStatus("Cancelled")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition cursor-pointer"
          >
            Reject
          </button>
        )}

        {currentStatus === "Completed" &&
          request.paymentStatus === "Pending" && (
            <div className="flex items-center gap-1 px-3 py-2 rounded-lg border text-white text-sm bg-amber-600">
              <CreditCard size={12} />
              Payment Pending
            </div>
          )}

        {currentStatus === "Completed" && request.paymentStatus === "Paid" && (
          <div className="flex items-center gap-1 px-3 py-2 rounded-lg border text-white text-sm bg-green-900">
            <CreditCard size={12} />
            Paid
          </div>
        )}

        {currentStatus === "Completed" &&
          request.paymentStatus === "Failed" && (
            <div className="flex items-center gap-1 px-3 py-2 rounded-lg border text-white text-sm bg-red-600">
              <CreditCard size={12} />
              Payment Failed
            </div>
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
