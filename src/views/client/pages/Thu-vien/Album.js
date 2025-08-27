import bannerImg from "../../../../assets/images/hero_banner.jpg";
import { Row, Col } from "antd";
import "./Album.css";

function Album() {
  return (
    <>
      <div className="body">
        <div className="album-container">
          <h3 className="title-page h3">
            <span>Thư viện</span> / <span>Album 1</span>
          </h3>
          <Row gutter={[24, 24]} className="detail-album-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <Col
                key={i}
                xs={24} 
                sm={12}
                md={8}
                lg={6}
                className="detail-album-item"
              >
                <img src={bannerImg} alt={`Album Cover ${i + 1}`} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Album;
