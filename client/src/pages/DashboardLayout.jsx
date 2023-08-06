import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, SmallSideBar, Navbar } from "../components";
import { createContext, useContext, useState } from "react";

const DashbordContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const user = { name: "john" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => console.log("logout user");

  return (
    <DashbordContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashbordContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashbordContext);
};

export default DashboardLayout;
