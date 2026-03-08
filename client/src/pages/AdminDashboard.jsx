import React, { useEffect, useState, useRef } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  CheckCircle,
  XCircle,
  Plus,
  Trash,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminDashboard() {
  const providerRequestRef = useRef(null);

  const addServiceRef = useRef(null);

  const [dashboardStats, setDashboardStats] = useState({
    pendingProviders: 0,
    totalServices: 0,
    totalProviders: 0,
    filteredProviderRequests: [],
  });

  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDashboardStats = async () => {
      const res = await axios.get(`${BASE_URL}/admin/me/dashboard`, {
        withCredentials: true,
      });
      setDashboardStats(res.data);
    };

    fetchAdminDashboardStats();
  }, []);

  const updateProviderStatus = (id) => {
    try {
      axios.patch(
        `${BASE_URL}/admin/verifyProvider/${id}`,
        {},
        { withCredentials: true }
      );
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      await axios.post(`${BASE_URL}/service/`, input, {
        withCredentials: true,
      });
      toast.success("Service added successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const scrollToProviderRequest = () => {
    providerRequestRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAddService = () => {
    addServiceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 scroll-smooth">
      {/* SIDEBAR */}

      <aside className="w-72 bg-white/70 backdrop-blur-lg shadow-xl p-8 flex flex-col justify-between">
        <div>
          <nav className="space-y-3">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active
            />

            <SidebarItem
              onClick={scrollToProviderRequest}
              icon={<Users size={20} />}
              label="Providers"
            />

            <SidebarItem
              onClick={scrollToAddService}
              icon={<Briefcase size={20} />}
              label="Services"
            />
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex gap-3 text-red-500 hover:bg-red-50 p-3 rounded-xl"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}

      <main className="flex-1 p-10 space-y-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Back, Admin
        </h1>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Pending Providers"
            value={dashboardStats.pendingProviders}
            gradient="from-yellow-400 to-orange-500"
          />

          <StatCard
            title="Total Services"
            value={dashboardStats.totalServices}
            gradient="from-green-500 to-green-700"
          />

          <StatCard
            title="Total Providers"
            value={dashboardStats.totalProviders}
            gradient="from-yellow-500 to-green-500"
          />
        </div>

        {/* PROVIDER VERIFICATION */}

        <section
          ref={providerRequestRef}
          className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Provider Verification</h2>

          <div className="space-y-4">
            {dashboardStats.filteredProviderRequests.map((req) => (
              <div
                key={req._id}
                className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">{req.userId.name}</h3>

                  <p className="text-slate-500 text-sm">{`Email : ${req.userId.email}`}</p>

                  <p className="text-slate-500 text-sm">{`Phone : ${req.userId.phone}`}</p>

                  <p className="text-slate-500 text-sm">
                    {`Service : ${req.serviceOfferedId.name}`}
                  </p>

                  <p className="text-slate-500 text-sm">
                    {`Description : ${req.serviceOfferedId.description}`}
                  </p>

                  <p className="text-slate-500 text-sm">{`Price : ${req.price} AED`}</p>

                  <p className="text-slate-500 text-sm">
                    {`Experience year(s) : ${req.experienceYears}`}
                  </p>

                  <p className="text-slate-500 text-sm">{`Service Area : ${req.serviceAreas}`}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => updateProviderStatus(req.userId._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl flex gap-2 items-center hover:bg-green-600"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICE MANAGEMENT */}

        <section
          ref={addServiceRef}
          className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Manage Services</h2>

          {/* ADD SERVICE */}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="text"
                placeholder="Service Name"
                name="name"
                onChange={handleChange}
                className="border px-4 py-2 rounded-xl w-64"
              />

              <input
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                className="border px-4 py-2 rounded-xl w-96"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2 rounded-xl flex gap-2 items-center hover:scale-105 transition"
              >
                <Plus size={16} />
                Add Service
              </button>
            </div>
          </form>

          {/* SERVICE LIST */}

          <div className="space-y-4">
            {/* {services.map((service) => (
              <div
                key={service._id}
                className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold">{service.name}</h3>

                  <p className="text-slate-500 text-sm">
                    {service.description}
                  </p>
                </div>

                <button
                  onClick={() => deleteService(service._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl flex gap-2 items-center hover:bg-red-600"
                >
                  <Trash size={16} />
                  Delete
                </button>
              </div>
            ))} */}
          </div>
        </section>
      </main>
    </div>
  );
}

/* SIDEBAR ITEM */

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex gap-4 px-4 py-3 rounded-2xl cursor-pointer transition
    ${
      active
        ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/30"
        : "hover:text-yellow-600 hover:bg-yellow-100"
    }`}
  >
    {icon}
    {label}
  </div>
);

/* STAT CARD */

const StatCard = ({ title, value, gradient }) => (
  <div
    className={`text-white rounded-3xl p-6 shadow-lg bg-gradient-to-r ${gradient} hover:scale-105 transition`}
  >
    <p className="opacity-90">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
  </div>
);

export default AdminDashboard;
