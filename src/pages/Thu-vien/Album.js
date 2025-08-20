import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import bannerImg from "../../assets/images/hero_banner.jpg";
import "./Album.css";

function Album() {
  return (
    <>
      <Header />
      <div className="body">
        <div className="album-container">
          <h3 className="h3">
            <span>Thư viện</span> / <span>Album 1</span>
          </h3>
          <div className="detail-album-grid">
            <div className="detail-album-item">
              <img src={bannerImg} alt="Album Cover" />
            </div>
            <div className="detail-album-item">
              <img src={bannerImg} alt="Album Cover" />
            </div>
            <div className="detail-album-item">
              <img src={bannerImg} alt="Album Cover" />
            </div>
            <div className="detail-album-item">
              <img src={bannerImg} alt="Album Cover" />
            </div>
            <div className="detail-album-item">
              <img src={bannerImg} alt="Album Cover" />
            </div>
            <div className="detail-album-item">
              <img src={bannerImg} alt="Album Cover" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Album;
