import React from "react"
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <NavLink to="/profile">Profile</NavLink>
            <br />
            <NavLink to="/profileOld">Add a Trip</NavLink>
            <br />
            <NavLink to='/managetrips'>Manage Trips</NavLink>
        </div>
    )
}

export default NavBar