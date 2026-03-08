import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-slate-500 text-white">
      <div className="grid md:grid-cols-4 gap-8 px-6 py-12">
        <div>
          <h1 className="font-bold text-2xl mb-4">HelperBee</h1>
          <p className="text-sm leading-6 text-slate-300">
            Your trusted platform to connect customers with professional service
            providers quickly and securely.
          </p>
        </div>

        <div>
          <h1 className="text-lg font-bold mb-4">Quick Links</h1>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="hover:text-white">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/services">Services</Link>
            </li>
            <li className="hover:text-white">About</li>
            <li className="hover:text-white">Contact</li>
          </ul>
        </div>

        <div>
          <h1 className="text-lg font-bold mb-4">Services</h1>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Plumbing</li>
            <li>Electrical</li>
            <li>Cleaning</li>
            <li>Appliance Repair</li>
          </ul>
        </div>

        <div>
          <h1 className="text-lg font-bold mb-4">Contact Us</h1>
          <p className="space-y-2 text-sm text-slate-300">
            support@helperbee.com
          </p>
          <p className="space-y-2 text-sm text-slate-300 mt-2">
            +521 698410232
          </p>
        </div>
      </div>
      <div className="border-t border-slate-900 py-4">
        <p className="text-slate-500 text-sm text-center">
          © {new Date().getFullYear()} Helperbee. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
