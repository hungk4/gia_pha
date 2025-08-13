import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Giapha from "./pages/Gia-pha/Giapha";
import Thuvien from "./pages/Thu-vien/Thuvien";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gia-pha" element={<Giapha />} />
        <Route path="/thu-vien" element={<Thuvien />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
