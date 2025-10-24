import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../../context/AppContext";
import Navigation from "../../Navigation/Navigation";
import Submenu from "../../Submenu/Submenu";

const Navbar = () => {
  const { handleActive } = useGlobalContext();

  return (
    <div
      className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-7xl 
		text-white bg-nav-bg rounded-2xl">
      <div className="container mx-auto px-8 py-6 flex justify-between items-center relative">
        <h3 className="text-3xl tracking-widest font-bold">strapi</h3>
        <Navigation />
        <Submenu />
        <button
          onClick={handleActive}
          className="cursor-pointer text-stripe text-xl">
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
