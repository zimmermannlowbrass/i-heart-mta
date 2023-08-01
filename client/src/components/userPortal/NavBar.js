import React from "react"
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/user";

function NavBar() {

    const {user, setUser} = useContext(UserContext)

    function handleSignOut() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setUser(null))
    }
    return (
        <div>
            <button onClick={() => handleSignOut()}>Sign Out</button>
            <NavLink to="/"><h1>{user.name}<br/>♥ MTA</h1></NavLink>
            <NavLink to="/addtrip"><button>Add a Trip</button></NavLink>
            <br />
            <NavLink to='/dashboard'><button>Dashboard</button></NavLink>
        </div>
    )
}

export default NavBar