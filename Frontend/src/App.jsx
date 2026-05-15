import { BrowserRouter , Route , Routes } from "react-router-dom";
import react from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import priroutes from "./components/priroutes";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<priroutes><Dashboard/></priroutes>} />
        <Route path="/AddProduct" element={<AddProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;