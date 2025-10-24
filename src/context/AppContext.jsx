import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [active, setActive] = useState(false);
  const [pageId, setPageId] = useState(null);

  const handleActive = () => {
    setActive((prev) => !prev);
  };

  return (
    <GlobalContext.Provider
      value={{
        active,
        handleActive,
        pageId,
        setPageId,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
