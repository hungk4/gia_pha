import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Search from "../../components/Search/Search";
import "./Thuvien.css";
import Card1 from "../../components/Card1/Card1";
function Thuvien() {
  return (
    <>
      <Header />
      <div className="body">
        <div className="thuvien-container">
          <h3 className="title-page h3">Thư viện</h3>
          <div className="tool">
            <div className="tool-left">
              <label for="select-options" className="label-select p2-r">
                Hiển thị
              </label>
              <select
                id="select-options"
                className="select-options"
                name="select-options"
                value="15"
              >
                <option value="9">9</option>
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
            </div>
            <div className="tool-right">
              <Search placeholder="Tìm kiếm album" />
            </div>
          </div>
          <div className="album-grid">
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
            <div className="album-item">
              <Card1 title="Img Title" />
            </div>
          </div>
          <div className="pagination">
            <button className="p2-r inactive">Previous</button>
            <button className="p2-r active">1</button>
            <button className="p2-r">2</button>
            <button className="p2-r">3</button>
            <span className="p2-r">...</span>
            <button className="p2-r">10</button>
            <button className="p2-r">Next</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Thuvien;
