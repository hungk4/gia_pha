import "./Section.css";
import { Row, Col } from "antd";

function Section(props) {
  const renderMedia = () => {
    switch (props.mediaType) {
      case "image":
        return <img src={props.media} alt={props.title} />;
      case "video":
        return (
          <video controls>
            <source src={props.media} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        );
      case "iframe":
        return props.media;
      default:
        return null;
    }
  };
  return (
    <section className="section">
      <div className="section-title">
        <h3 className="h3">{props.title}</h3>
        <div className="line"></div>
      </div>

      <Row
        gutter={[32, 32]}
        className="section-content"
        justify="center"
        align="middle"
      >
        <Col xs={24} md={12} className="section-text p1-r">
          {props.text ? <p>{props.text}</p> : <p>Nội dung đang cập nhật....</p>}
        </Col>
        <Col xs={24} md={12} className="section-media">
          {props.media && renderMedia()}
        </Col>
      </Row>
    </section>
  );
}

export default Section;
