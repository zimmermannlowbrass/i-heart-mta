import { useLoadScript } from "@react-google-maps/api"

import ProfileMap from "./ProfileMap"

function ProfileHome() {

  const googleAPIkey = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY

  const { isLoaded } =  useLoadScript({
    googleMapsApiKey: googleAPIkey,
    libraries: ["places"]
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div id="map">
      <ProfileMap/>
    </div>
  );
}

export default ProfileHome;