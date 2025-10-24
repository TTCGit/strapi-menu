import { useRef } from "react";
import { useGlobalContext } from "../context/AppContext";
import sublinks from "../data/data";

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext();
  const currentPage = sublinks.find((item) => item.pageId === pageId);
  const submenuContainer = useRef();
  const handleMouseLeave = (event) => {
    const submenu = submenuContainer.current;
    const { clientX, clientY } = event;
    const { right, left, bottom } = submenu.getBoundingClientRect();

    if (clientX < left || clientX > right || clientY > bottom) {
      setPageId(null);
    }
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      ref={submenuContainer}
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-[600px] bg-nav-bg rounded-xl shadow-lg p-6 
    transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
    ${
      currentPage
        ? "opacity-100 visible translate-y-0"
        : "opacity-0 invisible translate-y-6"
    }`}>
      <h5 className="font-semibold text-md uppercase mb-6">
        {currentPage?.page}
      </h5>
      <div
        className={`grid gap-3 ${
          currentPage?.links?.length > 3 ? "grid-cols-2" : "grid-cols-1"
        }`}>
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link;

          return (
            <a
              className="flex items-center gap-3"
              key={id}
              href={url}>
              <span className="text-xl text-stripe">{icon}</span> {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Submenu;
