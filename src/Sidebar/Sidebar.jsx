import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../context/AppContext";

const Sidebar = () => {
  const { active, handleActive } = useGlobalContext();

  return (
    <div
      className={`absolute right-6 top-4 p-8  bg-nav-bg text-white shadow-md rounded-lg 
				h-[calc(100vh-20rem)] w-md transition-all ease-in duration-400  ${
          active
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}>
      <div>
        <ul>
          <li>Content</li>
        </ul>
        <button>
          <IoMdClose onClick={handleActive} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
