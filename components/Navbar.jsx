import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import useTheme from "../context/useTheme";
import toast from "react-hot-toast";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiLogOut,
  FiBookOpen,
  FiList,
  FiPlusSquare,
  FiHome,
  FiGrid,
  FiSun,
  FiMoon,
  FiInfo,
} from "react-icons/fi";

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark/light mode"
      className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 shrink-0 ${
        dark ? "bg-sky-600" : "bg-slate-300"
      }`}
    >
      <FiSun className="absolute left-1.5 top-1/2 -translate-y-1/2 text-amber-300 w-3 h-3 pointer-events-none" />
      <FiMoon
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ${dark ? "text-slate-200" : "text-slate-500"}`}
      />
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md transition-transform duration-200 bg-white ${dark ? "translate-x-6" : "translate-x-0"}`}
      />
    </button>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const labelClass = "inline";

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 font-medium text-sm transition-all duration-200 px-2.5 py-1.5 rounded-md whitespace-nowrap ${
      isActive
        ? "text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-400/20 shadow-sm"
        : "text-slate-600 dark:text-slate-400 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-500/15 hover:shadow-sm hover:scale-105"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2.5 font-medium text-sm transition-all duration-200 py-2.5 px-2 rounded-lg ${
      isActive
        ? "text-sky-600 dark:text-sky-400 font-semibold bg-sky-100 dark:bg-sky-400/20"
        : "text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-500/15"
    }`;

  return (
    <nav className="bg-white dark:bg-slate-950 sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 sm:h-16 gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-sky-600 rounded-xl flex items-center justify-center shadow-md group-hover:bg-sky-500 transition-colors shrink-0">
              <FiBookOpen className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Study<span className="text-sky-600 dark:text-sky-400">Nook</span>
            </span>
          </Link>

          {/* Desktop / Tablet nav links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            <NavLink to="/" end className={navLinkClass}>
              <FiHome size={15} />
              <span className={labelClass}>Home</span>
            </NavLink>
            <NavLink to="/rooms" className={navLinkClass}>
              <FiGrid size={15} />
              <span className={labelClass}>Rooms</span>
            </NavLink>

            {user && (
              <>
                <NavLink to="/add-room" className={navLinkClass}>
                  <FiPlusSquare size={15} />
                  <span className={labelClass}>Add Room</span>
                </NavLink>
                <NavLink to="/my-listings" className={navLinkClass}>
                  <FiList size={15} />
                  <span className={labelClass}>My Listings</span>
                </NavLink>
                <NavLink to="/my-bookings" className={navLinkClass}>
                  <FiBookOpen size={15} />
                  <span className={labelClass}>My Bookings</span>
                </NavLink>
              </>
            )}

            <NavLink to="/about" className={navLinkClass}>
              <FiInfo size={15} />
              <span className={labelClass}>About</span>
            </NavLink>
          </div>

          {/* theme toggle + auth */}
          <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
            <ThemeToggle />
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 p-1 pr-2 rounded-full hover:bg-sky-100 dark:hover:bg-sky-500/25 transition border border-slate-300 dark:border-slate-600 hover:border-sky-400 dark:hover:border-sky-500"
                >
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0369a1&color=fff`
                    }
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-sky-300 dark:border-sky-600 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "U")}&background=0369a1&color=fff`;
                    }}
                  />
                  <FiChevronDown
                    className={`text-slate-400 transition-transform shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
                    size={14}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-300 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-2.5 border-b-2 border-slate-300 dark:border-slate-700 mb-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-800 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 w-full text-left transition"
                    >
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-200 px-3 py-2 whitespace-nowrap rounded-md hover:bg-sky-100 dark:hover:bg-sky-500/15"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md whitespace-nowrap"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-1.5 ml-auto">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-3 shadow-xl transition-colors duration-200">
          <div className="flex flex-col gap-1">
            <NavLink
              to="/"
              end
              className={mobileNavLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <FiHome size={15} />
              Home
            </NavLink>
            <NavLink
              to="/rooms"
              className={mobileNavLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <FiGrid size={15} />
              All Rooms
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/add-room"
                  className={mobileNavLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <FiPlusSquare size={15} />
                  Add Room
                </NavLink>
                <NavLink
                  to="/my-listings"
                  className={mobileNavLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <FiList size={15} />
                  My Listings
                </NavLink>
                <NavLink
                  to="/my-bookings"
                  className={mobileNavLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <FiBookOpen size={15} />
                  My Bookings
                </NavLink>
              </>
            )}
            <NavLink
              to="/about"
              className={mobileNavLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <FiInfo size={15} />
              About
            </NavLink>

            <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 py-1">
                    <img
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0369a1&color=fff`
                      }
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-sky-300 dark:border-sky-600"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=U&background=0369a1&color=fff`;
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400 font-medium py-1"
                  >
                    <FiLogOut size={14} /> Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3 pt-1">
                  <Link
                    to="/login"
                    className="border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-medium px-4 py-2 rounded-lg transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
