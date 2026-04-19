import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/bee.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-white/40">
      <div className="flex items-center justify-between text-yellow-600 py-3 px-4 sm:px-6 md:px-10">
        <Link to="/">
          <img
            src={logo}
            alt=""
            className="h-[50px] sm:h[60px] md:h-[70px] w-auto object-contain"
          />
        </Link>
        <ul className="hidden md:flex items-center gap-8 font-semibold">
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/login">Sign Up / Log In</Link>
          </li>
          <li>
            <Link to="/helpingbee-signup">
              <button className="border px-4 py-2 rounded-xl cursor-pointer">
                Become a Helping Bee
              </button>
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-5 pb-5 text-yellow-600 font-semibold">
          <Link to="/services" onClick={() => setMenuOpen(false)}>
            Services
          </Link>
          <Link to="/login">Sign Up /Log In</Link>
          <Link to="/helpingbee-signup" onClick={() => setMenuOpen(false)}>
            <button className="border px-4 py-2 cursor-pointer rounded-xl">
              Become a Helping Bee
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
