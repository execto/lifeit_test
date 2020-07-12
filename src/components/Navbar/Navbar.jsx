import React from "react";
import { Link } from "react-router-dom";
import NavToggleButton from "../NavToggleButton/NavToggleButton";
import { authService } from "../../App";

import "./navbarStyles.scss";

const Navbar = React.memo(({ children }) => {
  const logOut = React.useCallback(() => {
    authService.logout();
    document.location.reload();
  }, []);

  return (
    <div className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <Link to="/" className="navbar-brand">
        <span className="first">Life</span>
        <span className="two">IT</span>
      </Link>
      <NavToggleButton />
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav flex-column flex-sm-row flex-grow-1 justify-content-sm-between align-items-sm-center">
          <div className="d-flex flex-column flex-sm-row">{children}</div>
          <div>
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              onClick={logOut}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
