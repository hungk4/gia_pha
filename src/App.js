import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Giapha from "./pages/Gia-pha/Giapha";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gia-pha" element={<Giapha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
