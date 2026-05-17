import { BrowserRouter , Route , Routes } from "react-router-dom";
import react from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import priroutes from "./components/priroutes";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import EditProduct from "./pages/EditProduct";
import UpdateProfile from "./pages/UpdateProfile";
import Explore from "./pages/Explore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<priroutes><Dashboard/></priroutes>} />
        <Route path="/AddProduct" element={<AddProduct/>}/>
        <Route path="/ViewProduct" element={<ViewProduct/>}/>
        <Route path="/EditProduct/:id" element={<EditProduct/>}/>
        <Route path="/ViewProfile" element={<UpdateProfile/>}/>
        <Route path="/explore" element={<Explore/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;