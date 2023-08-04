import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../../context/user";


function EditProfile({ userTrips }) {

    const {user, setUser} = useContext(UserContext)

    function handleSignOut() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setUser(null))
    }

    return (
        <div>
            <h1>Profile</h1>
            <h3>Name:<br />{user.name}</h3>
            <h3>Occupation:<br/>{user.role ? user.role : 'n/a'}</h3>
            <h3>Borough:<br/>{user.borough}</h3>
            <h3>Trips Taken:<br/>{userTrips.length}</h3>
            <button onClick={() => handleSignOut()}>Sign Out</button>   
        </div>
    )
}

export default EditProfile;