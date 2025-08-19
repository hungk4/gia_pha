import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Giapha from "./pages/Gia-pha/Giapha";
import Thuvien from "./pages/Thu-vien/Thuvien";
import Sukien from "./pages/Su-kien/Sukien";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gia-pha" element={<Giapha />} />
        <Route path="/thu-vien" element={<Thuvien />} />
        <Route path="/su-kien" element={<Sukien />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
