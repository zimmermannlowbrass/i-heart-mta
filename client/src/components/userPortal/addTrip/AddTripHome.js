import { useLoadScript } from "@react-google-maps/api"

import AddTripMap from "./AddTripMap"
function AddTripHome() {

  const googleAPIkey = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY

  const { isLoaded } =  useLoadScript({
    googleMapsApiKey: googleAPIkey,
    libraries: ["places"]
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div id="map">
      <AddTripMap />
    </div>
  );
}

export default AddTripHome;