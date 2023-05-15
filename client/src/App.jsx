
import { Navbar, Landing, Footer, Roadmap } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="bg-black">
      <Navbar />
      <Landing />
    </div>
    <Roadmap />
    <Footer />
  </div>
);

export default App;
