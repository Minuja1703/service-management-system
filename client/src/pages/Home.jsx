import React from "react";
import coverImg from "../assets/images/image4.avif";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h[600px] bg-cover bg-center px-4 sm:px-6 flex items-end justify-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      >
        <Link to="/services">
          <button className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-yellow-900 hover:-translate-y-1 bg-yellow-600 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg md:text-xl rounded-xl sm:rounded-2xl text-white shadow-lg mb-6 sm:mb-10 font-semibold">
            Explore Services
          </button>
        </Link>
      </div>

      <h3 className="text-center font-bold text-yellow-600 drop-shadow-lg my-4 sm:my-6 text-sm sm:text-base md:text-lg lg:text-xl px-4">
        "Because Every Home Deserves a Helping Bee."
      </h3>
    </>
  );
}

export default Home;
