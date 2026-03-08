import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";

export const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.get(`${BASE_URL}/auth/me`, { withCredentials: true });
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        toast.error("Please login.");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return null;

  return isAuth ? children : <Navigate to="/login" />;
};
