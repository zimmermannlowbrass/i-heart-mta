import Welcome from './components/Welcome';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter>
      <div>
        <Welcome />
      </div>
    </BrowserRouter>
  )
}

export default App;