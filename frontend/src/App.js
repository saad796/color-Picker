import './App.css';
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import ColorDisplay from './components/ColorDisplay';
import Login from './components/Login'
import Register from './components/Register';
import Signin from './components/Signin';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import { Routes, Route} from 'react-router-dom';

const App = () => {
  const [userDetails , setUserDetails] = useState({loginStatus:false, username:undefined,userid:undefined})

  function clearUserData()
  {
    setUserDetails({ loginStatus:false, username:undefined,userid:undefined});
  }

  return (
    <>
      <Navbar username={userDetails.username} loginStatus={userDetails.loginStatus} logout={clearUserData}/>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/colorPicker" element={<ColorDisplay userData={userDetails}/>}/>
        <Route  path="/register" element={<Register />}/>
        <Route  path='/login' element={ <Login userData={setUserDetails}/>}  />
        <Route  path='/signin' element={ <Signin userData={setUserDetails}/>}  />
        <Route element={<p>Page Not Found</p>}/>
      </Routes>  
      
    </>
  )
};

export default App;