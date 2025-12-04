import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navlinksData = [
    {
      id: 1,
      link: "Home",
      to: "/",
    },
    {
      id: 2,
      link: "About",
      to: "/about",
    },
    {
      id: 3,
      link: "Services",
      to: "/services",
    },
    {
      id: 4,
      link: "Contact",
      to: "/contact",
    },
    // Login and Register only show if not logged in
    ...(user
      ? [
          {
            id: 6,
            link: "Logout",
            to: "/logout",
            isLogout: true,
          },
        ]
      : [
          {
            id: 5,
            link: "Login",
            to: "/login",
          },
          // {
          //   id: 6,
          //   link: "Register",
          //   to: "/register",
          // },
        ]),
  ];

  // Handles clicking logout; logs user out and then navigates to login page
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-black">
      <div className="flex justify-between items-center p-4">
        <Link to="/" className="text-white capitalize text-3xl font-bold">
          logo
        </Link>
        <ul className="flex items-center gap-4 [&>li]:text-xl font-semibold ">
          {navlinksData.map((item) => (
            <li key={item.id}>
              {item.isLogout ? (
                <button
                  onClick={handleLogout}
                  className="text-white underline hover:no-underline hover:text-red-500 transition-all"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500"
                      : "text-white underline hover:no-underline transition-all"
                  }
                >
                  {item.link}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
