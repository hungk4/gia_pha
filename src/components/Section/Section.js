import "./Section.css";

function Section(props) {
  const renderMedia = () => {
    switch(props.mediaType) {
      case 'image':
        return <img src={props.media} alt={props.title} />;
      case 'video':
        return (
          <video controls>
            <source src={props.media} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        );
      case 'iframe':
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
      <div className="section-content">
        <div className="section-text p1-r">
          {props.text ? <p>{props.text}</p> : <p>Nội dung đang cập nhật....</p>}
        </div>
         <div className="section-media">
          {props.media && renderMedia()}
        </div>
      </div>
    </section>
  );
}

export default Section;
