
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Address from './pages/Address';
import Orderplace from './pages/Orderplace';
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/delivery-address" element={<Address/>}/>
        <Route path="/order-placed" element={<Orderplace/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
