import { useLoadScript } from "@react-google-maps/api"
import { useContext } from "react";

import { UserContext } from "../../../context/user";

import ProfileMap from "./ProfileMap"

function ProfileHome() {

  const googleAPIkey = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY
  const user = useContext(UserContext)
  const currentUser = user[0]


  const { isLoaded } =  useLoadScript({
    googleMapsApiKey: googleAPIkey,
    libraries: ["places"]
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div id="map">
      <ProfileMap user={currentUser}/>
    </div>
  );
}

export default ProfileHome;