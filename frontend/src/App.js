
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Address from './pages/Address';
import Orderplace from './pages/Orderplace';
import Myorder from './pages/Myorder';
import Profile from './pages/Profile';
import SelectAddress from './pages/SelectAddress';
//admin pages 
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCategory from './pages/admin/category/Category';
import AddCategory from './pages/admin/category/Category';
import EditCategory from './pages/admin/category/EditCategory';
import Products from './pages/admin/products';
import AddProduct from './pages/admin/products/Add';
import EditProduct from './pages/admin/products/Edit';
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/delivery-address" element={<SelectAddress/>}/>
        <Route path="/order-placed" element={<Orderplace/>}/>
        <Route path="/my-orders" element={<Myorder/>}/>
        <Route path="/my-profile" element={<Profile/>}/>

        {/* admin route */}
        <Route path={"/admin"} element={<AdminLogin/>}/>
        <Route path={"/admin/login"} element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/category" element={<AdminCategory/>}/>
        <Route path="/admin/category/edit" element={<EditCategory/>}/>

        <Route path="/admin/products" element={<Products/>}/>
        <Route path="/admin/products/add" element={<AddProduct/>}/>
        <Route path="/admin/products/edit" element={<EditProduct/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
