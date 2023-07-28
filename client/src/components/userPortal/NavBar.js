import React from "react"
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/user";

function NavBar() {

    const {setUser} = useContext(UserContext)

    function handleSignOut() {
        console.log('you signed out!')
        setUser(null)
        window.location.reload()
    }
    return (
        <div>
            <button onClick={() => handleSignOut()}>Sign Out</button>
            <h1>Welcome</h1>
            <NavLink to="/">Profile</NavLink>
            <br />
            <NavLink to="/addtrip">Add a Trip</NavLink>
            <br />
            <NavLink to='/dashboard'>Dashboard</NavLink>
        </div>
    )
}

export default NavBar