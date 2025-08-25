import HeroBanner from "../../../../components/HeroBanner/HeroBanner";
import Section from "../../../../components/Section/Section";

import nhaThoImg from "../../../../assets/images/nhaTho.jpg";

function Home() {
  return (
    <>
      <div className="body">
        <HeroBanner />
        <Section
          title="Giới thiệu dòng họ"
          text={
            <>
              “ Theo gia phả lưu truyền, tổ tiên của dòng họ Nguyễn đến định cư
              tại vùng đất Hà Nam từ khoảng cuối thế kỷ 19. Từ đó đến nay, dòng
              họ đã trải qua nhiều thăng trầm cùng lịch sử dân tộc, nhưng vẫn
              giữ vững truyền thống đoàn kết, nghĩa tình và trọng đạo lý.
              <br />
              <br />
              Dòng họ Nguyễn luôn chú trọng giáo dục thế hệ trẻ về cội nguồn và
              đạo lý làm người. Với tinh thần uống nước nhớ nguồn, con cháu
              trong dòng họ đang không ngừng học tập, rèn luyện và xây dựng dòng
              họ ngày càng phát triển, văn minh và thịnh vượng. ”
            </>
          }
          media={nhaThoImg}
          mediaType="image"
        />
        <Section
          title="Địa chỉ"
          text={
            <>
              Địa chỉ: Thôn Phú Hoàn, Xã Tiên Hiệp, TP Phủ Lý, Tỉnh Hà Nam, Việt
              Nam
              <br />
              <br />
              Nhà thờ họ được xây dựng từ năm 2010, là nơi tổ chức các hoạt động
              thờ cúng tổ tiên, giỗ họ, họp mặt thường niên và giáo dục truyền
              thống cho thế hệ con cháu.
            </>
          }
          media={
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.3047563334967!2d105.93920007470244!3d20.575608403189477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135cfae422af577%3A0x2c9216d75bcb531!2zQ2jDuWEgUGjDuiBIb8Ogbg!5e0!3m2!1svi!2s!4v1754903545391!5m2!1svi!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          }
          mediaType="iframe"
        />
      </div>
    </>
  );
}

export default Home;
