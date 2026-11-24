import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import PaymentSuccess from "./pages/PaymentSuccess";
import Contact from "./pages/Contact";



export default function App(){
 return(
  <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/category/:c" element={<Category/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/payment" element={<Payment/>}/>
    <Route path="/orders" element={<Orders/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/otp" element={<OTP/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/admin-login" element={<AdminLogin/>}/>
    <Route path="/success" element={<PaymentSuccess />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/contact" element={<Contact />} />


   </Routes>
  </BrowserRouter>
 );
}
