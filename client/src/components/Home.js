import { useLoadScript } from "@react-google-maps/api"

import Map from "./dashboard/Map";

function Home() {

  const googleAPIkey = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY

  const { isLoaded } =  useLoadScript({
    googleMapsApiKey: googleAPIkey,
    libraries: ["places"]
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div id="map">
      <Map />
    </div>
  );
}

export default Home;