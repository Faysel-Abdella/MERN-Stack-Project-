import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../util/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        // do not display the NavLink that path is "admin" if the user is not admin
        if (path === "admin" && user.role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            // If "isBigSidebar" is there(passed or present) don't toggle the sidebar
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span> {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
