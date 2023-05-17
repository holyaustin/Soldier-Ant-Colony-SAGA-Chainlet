/* eslint-disable max-len */
import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import ant1 from "../assets/ant1.png";
import ant3 from "../assets/ant3.png";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start  p-3 m-2 cursor-pointer hover:shadow-xl text-justify">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-xl">{title}</h3>
      <p className="text-left mt-1 text-white text-2xl md:w-11/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className=" flex w-full justify-center items-center bg-purple-800" id="roadmap">
    <div className="flex mf:flex-row flex-col items-center justify-between md:px-20 md:py-10 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start mx-1 sm:mx-10">
        <h1 className="text-black text-3xl sm:text-5xl py-2 font-semibold">
          RoadMap
        </h1><br />
        <h1 className="text-black text-xl sm:text-3xl py-2 font-semibold">
          Collaborate to create Characters and weapons
        </h1><br /><br />
        <p className="text-left my-2 text-white font-light md:w-11/12 w-11/12 text-2xl">
          Join the Community and start earning by creating soldier ant characters that other gamers can buy from our marketplace. Follow our docs on specifications to begin creating characters and weapons.
        </p>
        <br /><br />
        <div className="md:flex-[1.9] flex-initial justify-left items-center">

          <img src={ant1} alt="welcome" className="w-100 cursor-pointer" />
          <br />
          <img src={ant3} alt="welcome" className="w-100 cursor-pointer" />
        </div>

      </div>

      <div className="flex-1 flex flex-col justify-start items-left text-2xl text-black">
        <ServiceCard
          color="bg-[#000000]"
          title="Q2 2023"
          icon={<BsShieldFillCheck fontSize={21} className="text-blue-700" />}
          subtitle="Finish Whitepaper v1.0 for Soldier Ant Colony"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q2 2023"
          icon={<BiSearchAlt fontSize={21} className="text-blue-700" />}
          subtitle="The First Batch of Game Characters."
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q2 2023"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="Main Gaming Framework Development"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q3 2023 "
          icon={<BsShieldFillCheck fontSize={21} className="text-blue-700" />}
          subtitle="NFT Contract Development with Rewards  "
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q3 2023"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="Access Wallet Function Integration, DEPLOY TO MAINNET"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q3 2023"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="Official Website & Marketplace Live"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q3 / Q4 2023"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="Global Community on Twitter, Discord, Reddit, Facebook, Telegram"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q1 2024"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="DAO - Decentralized Community Launch"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q1 2024"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="NFT Marketplace Character collaboration by community members"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Q2 2024"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="Metaverse Integration"
        />
      </div>
    </div>
  </div>
);

export default Services;
