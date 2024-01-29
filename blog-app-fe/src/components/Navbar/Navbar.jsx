import { Link } from "react-router-dom";
import { useLogout } from "../../customHooks/useLogout.jsx";
import { useAuthContext } from "../../customHooks/useAuthContext.jsx";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h3>Home</h3>
      </Link>
      <nav>
        {user ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <h3>Login</h3>
            </Link>
            <Link to="/register">
              <h3>Register</h3>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
