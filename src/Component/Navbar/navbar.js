import React, { useState, useRef, useEffect } from "react";
import "./navbar.css";
import ListIcon from "@mui/icons-material/List";
import MyLogo from "../../assests/mylogo.png";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/login";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import YouTubeIcon from "@mui/icons-material/YouTube";


// ✅ Suggestions generator based on query
const getSuggestions = (q) => {
  if (!q.trim()) return [];
  const base = [
    `${q} 2025`,
    `${q} trending`,
    `${q} viral`,
    `${q} new`,
    `${q} best`,
    `${q} highlights`,
    `${q} funny`,
    `${q} latest`,
  ];
  return base.slice(0, 6);
};

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic] = useState(
    "https://athenabpo.com/wp-content/uploads/2016/09/Headshot-Blank-Person-Circle-300x300.gif"
  );
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // ✅ keyboard navigation
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  const handleprofile = () => {
    navigate("/user/7697");
    setNavbarModal(false);
  };

  const setLoginModal = () => {
    setLogin(false);
  };

  const onclickOfPopUpOption = (button) => {
    setNavbarModal(false);
    if (button === "login") {
      setLogin(true);
    }
  };

  // ✅ Update suggestions as user types
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setActiveIndex(-1);
    if (val.trim()) {
      setSuggestions(getSuggestions(val));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // ✅ Navigate on search
  const doSearch = (q) => {
    if (!q.trim()) return;
    setShowDropdown(false);
    setSearchQuery(q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  // ✅ Keyboard navigation (up/down arrows + enter)
  const handleKeyDown = (e) => {
    if (!showDropdown) {
      if (e.key === "Enter") doSearch(searchQuery);
      return;
    }
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        doSearch(suggestions[activeIndex]);
      } else {
        doSearch(searchQuery);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarFunc}>
          <ListIcon sx={{ color: "white" }} />
        </div>
        <Link to="/" className="navbar-logo-link">
  <img src={MyLogo} alt="App Logo" className="mylogo" />
  <span
    className="logoText"
    onClick={() => {
      const base =
        window.location.origin + window.location.pathname + "#/";
      if (window.location.href === base) {
        window.location.reload();
      } else {
        window.location.href = base;
      }
    }}
  >
    {"RollamRoll".split("").map((char, i) => (
      <span
        key={i}
        className="logoChar"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        {char}
      </span>
    ))}
  </span>
</Link>
      </div>

      {/* MIDDLE — search with dropdown */}
      <div className="navbar-middle" ref={dropdownRef} style={{ position: "relative" }}>
        <div className="navbar_searchBox">
          <input
            type="text"
            placeholder="Search"
            className="navbar_searchBoxInput"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (searchQuery.trim()) setShowDropdown(true); }}
            autoComplete="off"
          />
          <div className="navbar_searchIconBox" onClick={() => doSearch(searchQuery)}>
            <SearchIcon sx={{ fontSize: "28px" }} />
          </div>
        </div>

        <div className="navbar_mike">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>

        {/* ✅ DROPDOWN */}
        {showDropdown && suggestions.length > 0 && (
          <div style={{
            position: "absolute",
            top: "48px",
            left: 0,
            width: "calc(100% - 52px)", // matches search box width
            background: "#212121",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            zIndex: 9999,
            overflow: "hidden",
            border: "1px solid #333",
            borderTop: "none",
          }}>
            {suggestions.map((s, i) => (
              <div
                key={i}
                onMouseDown={() => doSearch(s)} // mousedown fires before blur
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  background: activeIndex === i ? "#303030" : "transparent",
                  transition: "background 0.15s",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <SearchIcon sx={{ fontSize: "18px", color: "#aaa" }} />
                <span>{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <span
          onClick={() => navigate("/youtube", { state: { reload: Date.now() } })}
          style={{ cursor: "pointer" }}>
          <YouTubeIcon sx={{ fontSize: "30px", color: "red" }} />
        </span>
        <span onClick={() => navigate("/reels")} style={{ cursor: "pointer" }}>
          <VideoLibraryIcon sx={{ fontSize: "30px", color: "white" }} />
        </span>
        <span onClick={() => navigate("/763/upload")} style={{ cursor: "pointer" }}>
          <VideoCameraFrontIcon sx={{ fontSize: "30px", color: "white" }} />
        </span>
        <NotificationsActiveIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
        <img
          onClick={() => setNavbarModal((prev) => !prev)}
          src={userPic}
          alt="User"
          className="navbar-right-logo"
        />
        {navbarModal && (
          <div className="navbar-modal">
            <div className="navbar-modal-option" onClick={handleprofile}>Profile</div>
            <div className="navbar-modal-option" onClick={() => onclickOfPopUpOption("logout")}>Logout</div>
            <div className="navbar-modal-option" onClick={() => onclickOfPopUpOption("login")}>Login</div>
          </div>
        )}
      </div>

      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};

export default Navbar;