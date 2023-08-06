import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";

const BigSideBar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        // Here show the sidebar by default
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          {/* I do not to hide the navbar whenever the the user go
          to the link for the bigscreens */}
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSideBar;
