import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom';


  const rootContainer = document.getElementById('root');
const root = ReactDOM.createRoot(rootContainer);
root.render(


  <React.StrictMode>
    

    <App />
    
  </React.StrictMode>);



reportWebVitals();
