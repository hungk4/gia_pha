import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/client/pages/Home/Home";
import Giapha from "./views/client/pages/Gia-pha/Giapha";
import Thuvien from "./views/client/pages/Thu-vien/Thuvien";
import Sukien from "./views/client/pages/Su-kien/Sukien";
import Album from "./views/client/pages/Thu-vien/Album";
import DetailInfo from "./views/client/pages/Gia-pha/DetailInfo";
import ClientLayout from "./views/client/partials/ClientLayout";

import AdminHome from "./views/admin/pages/Home/AdminHome";
import AdminGiapha from "./views/admin/pages/Gia-pha/AdminGiapha";
import AdminThuvien from "./views/admin/pages/Thu-vien/AdminThuvien";
import AdminSukien from "./views/admin/pages/Su-kien/AdminSukien";
import AdminLayout from "./views/admin/partials/AdminLayout";
import AdminLogin from "./views/admin/pages/Login/AdminLogin";
import AdminEventList from "./views/admin/pages/Su-kien/AdminEventList";
import AdminEventUser from "./views/admin/pages/Su-kien/AdminEventUser";
import AdminAlbum from "./views/admin/pages/Thu-vien/AdminAlbum";
import AdminGiaphaUserList from "./views/admin/pages/Gia-pha/AdminGiaphaUserList";
import AdminCayGiaPha from "./views/admin/pages/Gia-pha/AdminCayGiaPha";
import AdminDetailInfo from "./views/admin/pages/Gia-pha/AdminDetailInfo";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client Routes */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gia-pha" element={<Giapha />} />
          <Route path="/gia-pha/chi-tiet" element={<DetailInfo />} />
          <Route path="/thu-vien" element={<Thuvien />} />
          <Route path="/thu-vien/album" element={<Album />} />
          <Route path="/su-kien" element={<Sukien />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />

          <Route path="gia-pha" element={<AdminGiapha />} />{" "}
          <Route path="gia-pha/cay-gia-pha" element={<AdminCayGiaPha/>} />
          <Route path="gia-pha/danh-sach-thanh-vien" element={<AdminGiaphaUserList/>} />
          <Route path="gia-pha/chinh-sua" element={<AdminDetailInfo/>} />

          <Route path="thu-vien" element={<AdminThuvien />} />
          <Route path="thu-vien/album/:id" element={<AdminAlbum />} />

          <Route path="su-kien" element={<AdminSukien />} />
          <Route path="danh-sach-su-kien" element={<AdminEventList />} />
          <Route path="danh-sach-nguoi-nhan-thong-bao" element={<AdminEventUser/>} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
