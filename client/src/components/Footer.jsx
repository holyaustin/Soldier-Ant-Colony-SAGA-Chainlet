import React from "react";

import logo from "../assets/logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 bg-black py-10">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={logo} alt="logo" className="w-24" />
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-center text-base">Soldier Ant Colony 2023. All rights reserved.</p>
        <p className="text-white text-center text-lg">Sponsor : BNB Chain, Uniswap, Particle Protocol, Chain Link.</p>

      </div>
    </div>
  </div>
);

export default Footer;
