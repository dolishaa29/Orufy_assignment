import { BrowserRouter , Route , Routes } from "react-router-dom";
import react from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import priroutes from "./components/priroutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<priroutes><Dashboard/></priroutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;