import React from "react";
import coverImg from "../assets/images/image4.avif";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        className="relative w-full h-[300px] md:h-[500px] bg-cover bg-center px-5 flex items-end  justify-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      >
        <Link to="/services">
          <button className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-yellow-900 hover:-translate-y-1  bg-yellow-600 p-4 text-xl rounded-2xl text-white shadow-lg mb-30 font-semibold">
            Explore Services
          </button>
        </Link>
      </div>

      <h3 className="text-center font-bold text-yellow-600 drop-shadow-lg mt-5">
        "Because Every Home Deserves a Helping Bee."
      </h3>
    </>
  );
}

export default Home;
