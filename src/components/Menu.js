import React, { useState } from "react";
import { NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { PAGES_URL } from "../constants/PagesUrl";
import "./menu.scss";
import Logo from "../assets/logoo.png";

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <NavItem>
        <Link className="logo-link" tag={Link} to={PAGES_URL.Home}>
          <img
            className="icon"
            alt="cards-page-logo"
            width="150px"
            height="70px"
            src={Logo}
          ></img>
        </Link>
      </NavItem>
      <ul className="nav-menu">
        {isLoggedIn ? (
          <>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home}>
                Search
              </Link>
            </NavItem>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home}>
                Add location
              </Link>
            </NavItem>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home}>
                Reservation
              </Link>
            </NavItem>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home}>
                Logout
              </Link>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Login}>
                Login
              </Link>
            </NavItem>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home}>
                Register
              </Link>
            </NavItem>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home}>
                Search
              </Link>
            </NavItem>
          </>
        )}
      </ul>
    </header>
  );
};

export default Menu;
