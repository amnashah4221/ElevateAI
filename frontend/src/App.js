import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landingpage from './pages/landingpage';
import Privacypolicypage from './pages/privacypolicypage';
import Termspage from './pages/terms';
import Contactpage from './pages/contactpage';
import Signup from './pages/signuppage';
import Login from './pages/loginpage';
import Dashboard from './pages/dashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Myresumes from './pages/myresumes';
import Profilepage from './pages/profilepage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/privacy' element={<Privacypolicypage/>}/>
        <Route path='/terms' element={<Termspage/>}/>
        <Route path='/contact' element={<Contactpage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/myresumes' element={<Myresumes/>}/>
        <Route path='/profile' element={<Profilepage/>}/>
     </Routes>
         
      <ToastContainer position="top-right" autoClose={3000} theme='dark'/>
   
      </BrowserRouter>
    </div>
  );
}

export default App;
