import { Navbar, Footer, Market } from "../components";

const send = () => (
  <div className="w-full gradient-bg-welcome">
    <Navbar />
    <div className="text-4xl text-center text-white font-bold mt-10 mb-20">
      <h1> Soldier Ant Colony: Marketplace</h1>
    </div>
    <Market />
    <Footer />
  </div>
);

export default send;
