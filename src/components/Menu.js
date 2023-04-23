import React, { useContext } from "react";
import { NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { PAGES_URL } from "../constants/PagesUrl";
import "./menu.scss";
import Logo from "../assets/logoo.png";
import LoginModal from "../components/login-modal";
import { AppContext } from "../App";
import { deleteUser } from "./delete-user";

const Menu = () => {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AppContext);

  const onClickLogout = () => {
    deleteUser()
    setIsAdmin(false)
    let isLoggedInStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInStorage != null) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    } else {
      alert("You are not logged in!");
    }
  }

  

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
              <Link tag={Link} to={PAGES_URL.Courts}>
                Courts
              </Link>
            </NavItem>
            {isAdmin && (
              <>
                <NavItem>
                  <Link tag={Link} to={PAGES_URL.Locations}>
                    Locations
                  </Link>
                </NavItem>
              </>
            )}
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home}>
                Reservation
              </Link>
            </NavItem>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home} onClick={onClickLogout}>
                Logout
              </Link>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Courts}>
                Courts
              </Link>
            </NavItem>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Register}>
                Register
              </Link>
            </NavItem>
            <NavItem>
              <Link tag={Link} to={PAGES_URL.Home}>
                <LoginModal />
              </Link>
            </NavItem>
          </>
        )}
      </ul>
    </header>
  );
};

export default Menu;
