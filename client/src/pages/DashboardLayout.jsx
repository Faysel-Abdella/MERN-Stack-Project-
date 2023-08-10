import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, SmallSideBar, Navbar } from "../components";
import { createContext, useContext, useState } from "react";
import customFetch from "../util/customFetch.js";

const DashbordContext = createContext();

export const loader = async () => {
  try {
    //Make request to the current user
    const res = await customFetch.get("/users/current-user");
    //extract the data response from axios response
    const { data } = res;
    //return it to use it in the component
    return data;
  } catch (error) {
    // If there is any error with finding the user when the user go to dashboard just redirect it to '/'
    return redirect("/");
  }
};

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  //Extract the user from the returned loader function
  const { user } = useLoaderData();

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

  const navigate = useNavigate();
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("You logged out");
  };

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
              {/* pass the user obj to the child pages and */}
              <Outlet context={{ user }} />
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
