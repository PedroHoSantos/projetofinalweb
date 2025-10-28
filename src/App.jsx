import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diets from "./pages/Diets";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dietas" element={<Diets />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
