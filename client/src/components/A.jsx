import React from "react";
import logo1 from "../assets/logo.png";

const RoadMap = () => (
  <div className="flex w-full justify-center items-center ">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">

        <h1 className="text-white text-3xl sm:text-5xl py-2 ">
          Road-Map
          <br />
        </h1>
      </div>

      <div className="md:flex-[0.95] flex-initial justify-center items-center mt-">
        <img src={logo1} alt="welcome" className="w-350 cursor-pointer " />
      </div>
    </div>
  </div>
);

export default RoadMap;
