import React from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
