// import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
// import connections from './connections';

function App() {

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   connections.getUsers().then(response => {
  //     if(response.data){
  //       console.log("ESTE RESPONSE", response);
  //     };
  //   })
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
