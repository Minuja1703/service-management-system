import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/bee.png";

function Navbar() {
  return (
    <div className="text-yellow-600 flex justify-center items-center gap-28 p-2">
      <Link to="/">
        <img src={logo} alt="" className="h-[70px] w-auto object-contain" />
      </Link>
      <ul className="flex items-center gap-9 font-semibold">
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/login">Sign Up / Log In</Link>
        </li>
        <li>
          <Link to="/helpingbee-signup">
            <button className="border p-3 rounded-xl cursor-pointer">
              Become a Helping Bee
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
