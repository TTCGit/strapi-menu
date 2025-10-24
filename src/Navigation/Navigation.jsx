import { useGlobalContext } from "../context/AppContext";
import sublinks from "../data/data";

const Navigation = () => {
  const { setPageId } = useGlobalContext();

  return (
    <div className="flex gap-2">
      {sublinks.map((item) => {
        const { pageId, page } = item;

        return (
          <button
            onMouseEnter={() => setPageId(pageId)}
            key={pageId}
            className="text-lg font-semibold tracking-wide">
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
