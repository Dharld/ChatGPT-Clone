/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export default function ShowContextProvider({ children }) {
  const [hide, setHide] = useState(true);

  const showSidebar = () => {
    setHide(false);
  };

  const hideSidebar = () => {
    setHide(true);
  };

  const toggleSidebar = () => {
    setHide(!hide);
  };

  const getSidebarState = () => {
    return hide;
  };
  return (
    <SidebarContext.Provider
      value={{ showSidebar, hideSidebar, toggleSidebar, getSidebarState }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useShowSidebar = () => useContext(SidebarContext);
