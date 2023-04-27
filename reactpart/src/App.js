import Index from './components/Index';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import UpdateProfile from './components/UpdateProfile';
import Store from './components/Store';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Index />
      <Routes>
        
        <Route path='/store' element={<Store />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/AddProduct' element={<AddProduct />}></Route>
        <Route path='/UpdateProfile' element={<UpdateProfile />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>

    </div>
  );
}

export default App;
