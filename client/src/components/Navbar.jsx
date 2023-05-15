import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import ConnectSequence from "./sequencewallet.tsx";
import logo from "../assets/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 bg-purple-800">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="sm:w-8 md:w-18 lg:w-14  cursor-pointer" />
      </div>
      <ul className="text-white justify-center lg:text-2xl md:flex hidden  items-center flex-initial">
        <Link to="/">Home</Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link to="/marketplace">MarketPlace</Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link to="/create">Collaborate</Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link to="/NFTdashboard">NFT-Dashboard</Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>

        <li className="justify-center text-black font-semibold bg-green-300 py-5 px-20 mx-8 sm:mx-3 sm:py-2 sm:px-8 rounded-full cursor-pointer hover:bg-green-800 hover:text-white ">
          <a href="https://app.diffusion.fi/#/swap" target="_blank" rel="noreferrer">
            Swap / Buy EVMOS Tokens Here
          </a>
        </li>

        <ConnectSequence />

      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Home", "MarketPlace", "Collaborate", "RoadMap"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
