import React from "react"
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <h1>Welcome</h1>
            <NavLink to="/">Profile</NavLink>
            <br />
            <NavLink to="/addtrip">Add a Trip</NavLink>
            <br />
            <NavLink to='/managetrips'>Manage Trips</NavLink>
        </div>
    )
}

export default NavBar