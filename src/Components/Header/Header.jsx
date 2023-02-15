import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Netflix_logo.png";
import { FiSearch } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">movies</Link>
        <Link to="/recentlyadded">Recently Added</Link>
        <Link to="/mylist">My List</Link>
      </div>

      {isAuthenticated ? (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Sign In</button>
      )}

      <FiSearch />
    </nav>
  );
};

export default Header;
