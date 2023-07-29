import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
// import { store } from "./app/store"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// const render = () => {
//   root.render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
// }
// render()
// store.subscrib(render)

