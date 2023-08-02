import React from "react"
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/user";

import "../../stylesheets/navbar.css"

function NavBar() {

    const {user} = useContext(UserContext)

    return (
        <div>
            <NavLink to="/"><h1 className="username-navlink">{user.name}<br/>I ♥ MTA</h1></NavLink>
            <NavLink to="/addtrip"><button>Add a Trip</button></NavLink>
            <br />
            <NavLink to='/dashboard'><button>Dashboard</button></NavLink>
        </div>
    )
}

export default NavBar