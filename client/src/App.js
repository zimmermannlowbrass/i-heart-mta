import { useLoadScript } from "@react-google-maps/api"

import Map from "./components/Map";

import './App.css';

function App() {



  const googleAPIkey = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY

  const { isLoaded } =  useLoadScript({
    googleMapsApiKey: googleAPIkey,
    libraries: ["places"]
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div >
      <Map />
    </div>
  );
}

export default App;