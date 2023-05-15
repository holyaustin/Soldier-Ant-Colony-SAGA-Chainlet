import { Navbar, Footer, Market } from "../components";

const MarketPlace = () => (
  <div className="bg-gray-100">
    <Navbar />
    <div className="text-4xl text-center text-black font-bold mt-10 mb-2">
      <h1> Explore Marketplace </h1>
    </div>
    <Market />
    <Footer />
  </div>
);

export default MarketPlace;
