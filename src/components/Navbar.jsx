
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="haunted-navbar">
            <NavLink to="/" className="nav-logo">
                HAUNTED<span>.</span>
            </NavLink>

            <div className="nav-links">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/stories">HORROR STORIES</NavLink>
                <NavLink to="/haunted-places">HAUNTED PLACES</NavLink>
                <NavLink to="/paranormal">PARANORMAL</NavLink>
                <NavLink to="/fear-lab">FEAR LAB</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
