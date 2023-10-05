import './App.css';
import ColorDisplay from './components/ColorDisplay';
import Login from './components/Login'
import Register from './components/Register';
import Signin from './components/Signin';
import { Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route  path="/" element={<ColorDisplay />}/>
        <Route  path="/register" element={<Register />}/>
        <Route  path='/login' element={ <Login />}  />
        <Route  path='/signin' element={ <Signin />}  />
        <Route element={<p>Page Not Found</p>}/>
      </Routes>  
      
    </>
  )
};

export default App;