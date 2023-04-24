import Index from './components/Index';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Add_Product from './components/Add_Product';
import Update_profile from './components/Update_profile';
import Store from './components/Store';

function App() {
  return (
    <div className="App">
      <Index />
      <Routes>
        
        <Route path='/store' element={<Store />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/AddProduct' element={<Add_Product />}></Route>
        <Route path='/UpdateProfile' element={<Update_profile />}></Route>
      </Routes>

    </div>
  );
}

export default App;
