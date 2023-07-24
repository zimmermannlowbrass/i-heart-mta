import React from "react"
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <NavLink to="/home">Go to map</NavLink>
            <br />
            <NavLink to="/profile">Go to profile</NavLink>
        </div>
    )
}

export default NavBar