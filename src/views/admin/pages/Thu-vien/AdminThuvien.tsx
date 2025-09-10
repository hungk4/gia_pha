import "./AdminThuvien.css";

import { Row, Col } from "antd";

import Button from "../../../../components/Button/Button";
import Search from "../../../../components/Search/Search";
import Card1 from "../../../../components/Card1/Card1";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { fetchAlbums } from "../../../../redux/library/librarySlice";

function AdminThuvien() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, albums } = useSelector(
    (state: RootState) => state.library
  );

  // fetch data albums
  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  // khi popup bật lên tắt scroll của body
  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popup]);

  // Input tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // tính toán phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);
  const indexFirst = (currentPage - 1) * itemsPerPage;
  const indexLast = currentPage * itemsPerPage;
  const currentAlbums = filteredAlbums.slice(indexFirst, indexLast);

  return (
    <>
      <div className="adminThuvien-container" style={{ height: "100%" }}>
        <h3 className="title-page h3">Thư viện</h3>
        <div className="tool">
          <div className="tool-left">
            <label htmlFor="select-options" className="label-select p2-r">
              Hiển thị
            </label>
            <select
              id="select-options"
              className="select-options"
              name="select-options"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="tool-right">
            <Search
              placeholder="Tìm kiếm album"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset về trang 1 khi tìm kiếm
              }}
            />
            <Button
              icon="add"
              text="Thêm album"
              onClick={() => {
                setPopup(true);
              }}
            />
          </div>
        </div>
        <div className="album-grid-wrapper">
          <Row gutter={[24, 24]} className="album-grid">
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {currentAlbums.map((album) => (
              <Col key={album.id} xs={24} sm={12} md={8} className="album-item">
                <Card1
                  img={album.image}
                  title={album.title}
                  onClick={() => {
                    navigate(`/admin/thu-vien/album/${album.id}`);
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
        <div className="pagination">
          <button
            className={`p2-r ${currentPage === 1 ? "inactive" : ""}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`p2-r ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          {/* <span className="p2-r">...</span> */}
          <button
            className={`p2-r ${currentPage === totalPages ? "inactive" : ""}`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
          >
            Next
          </button>
        </div>

        {popup && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-header">
                <p className="popup-title p1-b">Thêm album mới</p>
                <span
                  className="material-symbols-outlined close-btn"
                  onClick={() => setPopup(false)}
                >
                  close
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Submit form...");
                }}
              >
                <div className="form-group">
                  <label htmlFor="album-image">Ảnh album</label>
                  <input
                    id="album-image"
                    type="file"
                    accept="image/*"
                    className="input-image"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="title">Tiêu đề album</label>
                  <input type="text" placeholder="Nhập tiêu đề" />
                </div>

                <button type="submit" className="p2-b">
                  Gửi
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminThuvien;
