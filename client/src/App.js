import Welcome from './components/Welcome';
import React from 'react';
import Home from './components/dashboard/Home';
import { BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter>
      <div>
        <Welcome />
        {/* <Home /> */}
      </div>
    </BrowserRouter>
  )
}

export default App;