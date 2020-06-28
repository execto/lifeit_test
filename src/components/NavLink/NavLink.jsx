import React from "react";
import { NavLink as RNavLink } from "react-router-dom";

import "./navLinkStyles.scss";

const NavLink = React.memo(({ to, children }) => {
  return (
    <RNavLink to={to} activeClassName="active" className="nav-link nav-item">
      {children}
    </RNavLink>
  );
});

export default NavLink;
