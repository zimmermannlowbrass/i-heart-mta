import { useLoadScript } from "@react-google-maps/api"

import Map from "./components/Map";

import './App.css';

function App() {

  const { isLoaded } =  useLoadScript({
    googleMapsApiKey: "AIzaSyBpY34NuBHO_NY3ex55Rp0AZQeMDVAyaQo",
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