import { NavLink } from "react-router-dom";
import "./navbar.css";

const links = [
  { route: "/", label: "Home" },
  { route: "/planner", label: "Planner" },
  { route: "/saved", label: "Saved Routes" },
];

const Navbar = () => {
  return (
    <nav>
      {links.map((link) => (
        <NavLink key={link.route} to={link.route}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
