import { Row, Col } from "antd";

interface SectionProps {
  title: string;
  text?: string | React.ReactNode;
  media?: string | React.ReactNode;
  mediaType?: "image" | "video" | "iframe";
}

function Section(props: SectionProps) {
  const renderMedia = () => {
    switch (props.mediaType) {
      case "image":
        return <img src={props.media as string} alt={props.title} />;
      case "video":
        return (
          <video controls>
            <source src={props.media as string} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        );
      case "iframe":
        return props.media; // JSX.Element
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

      <Row gutter={[32, 32]} className="section-content" justify="center" align="middle">
        <Col xs={24} md={12} className="section-text p1-r">
          <p>{props.text || "Nội dung đang cập nhật...."}</p>
        </Col>
        <Col xs={24} md={12} className="section-media">
          {props.media && renderMedia()}
        </Col>
      </Row>
    </section>
  );
}

export default Section;
