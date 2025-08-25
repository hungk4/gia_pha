import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/client/pages/Home/Home";
import Giapha from "./views/client/pages/Gia-pha/Giapha";
import Thuvien from "./views/client/pages/Thu-vien/Thuvien";
import Sukien from "./views/client/pages/Su-kien/Sukien";
import Album from "./views/client/pages/Thu-vien/Album";
import DetailInfo from "./views/client/pages/Gia-pha/DetailInfo";
import MainLayout from "./views/client/partials/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gia-pha" element={<Giapha />} />
          <Route path="/gia-pha/chi-tiet" element={<DetailInfo />} />
          <Route path="/thu-vien" element={<Thuvien />} />
          <Route path="/thu-vien/album" element={<Album />} />
          <Route path="/su-kien" element={<Sukien />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
