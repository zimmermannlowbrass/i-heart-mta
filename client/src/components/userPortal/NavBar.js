import React from "react"
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/user";

function NavBar() {

    const {user, setUser} = useContext(UserContext)

    function handleSignOut() {
        console.log('you signed out!')

        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setUser(null))
    }
    return (
        <div>
            <button onClick={() => handleSignOut()}>Sign Out</button>
            <h1>{user.name}</h1>
            <NavLink to="/">Profile</NavLink>
            <br />
            <NavLink to="/addtrip">Add a Trip</NavLink>
            <br />
            <NavLink to='/dashboard'>Dashboard</NavLink>
        </div>
    )
}

export default NavBar