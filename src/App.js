import React from 'react';
//import { Routes, Route} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Mypage from './Mypage'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';





export default function App() {
  return (
  
    <div className="App">
 <Router>
          <Routes>
            

      
            <Route path="/" element={<Login />}></Route>
            <Route path="/user/main" element={<Main />}></Route>
            <Route path="/user/mypage" element={<Mypage />}></Route>
          </Routes>
          </Router>
      </div>
   
  );
};
