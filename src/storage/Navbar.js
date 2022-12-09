import { NavLink } from "react-router-dom";

const Navbar = () => {

    const navLinkStyles = ({ isActive }) => {
        return ({
            textDecoration: isActive ? "bold" : "none",
            fontWeight: isActive ? "normal" : "underline"
        })
    }

    return (
        <div>
            <nav>
                <NavLink style={navLinkStyles} to="/">Login</NavLink>
                <NavLink style={navLinkStyles} to="/register">Register</NavLink>
                <NavLink style={navLinkStyles} to="/complaint-tracker">Track-Your-Complaint</NavLink>
                <NavLink style={navLinkStyles} to="/admin-home-page">Admin-Home-Page</NavLink>
            </nav> 
        </div>
    )
}
export default Navbar;