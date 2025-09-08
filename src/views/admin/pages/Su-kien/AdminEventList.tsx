import "./AdminEventList.css";
import { Breadcrumb, Space, Table } from "antd";

import Search from "../../../../components/Search/Search";
import Button from "../../../../components/Button/Button";
import { useEffect, useState } from "react";

const { Column } = Table;

interface DataType {
  key: React.Key;
  stt: number;
  tenSuKien: string;
  duongLich: string;
  amLich: string; // Ngày âm
  diaDiem: string;
  ghiChu?: string;
  lapLai: string; // Lặp lại (vd: Hàng năm, Không lặp)
  thongBao: string; // Thông báo (vd: Trước 1 ngày)
}

const data: DataType[] = [
  {
    key: "1",
    stt: 1,
    tenSuKien: "Sinh nhật Bố",
    duongLich: "10/09/2025",
    amLich: "08/08/2025",
    diaDiem: "Hà Nội",
    ghiChu: "Mua quà trước",
    lapLai: "Hàng năm",
    thongBao: "Trước 1 ngày",
  },
  {
    key: "2",
    stt: 2,
    tenSuKien: "Kỷ niệm ngày cưới Bố Mẹ",
    duongLich: "01/10/2025",
    amLich: "19/08/2025",
    diaDiem: "TP.HCM",
    ghiChu: "Đặt bàn nhà hàng",
    lapLai: "Hàng năm",
    thongBao: "Trước 3 ngày",
  },
  {
    key: "3",
    stt: 3,
    tenSuKien: "Giỗ Ông Nội",
    duongLich: "15/11/2025",
    amLich: "15/10/2025",
    diaDiem: "Nghệ An",
    ghiChu: "Chuẩn bị lễ vật",
    lapLai: "Hàng năm",
    thongBao: "Trước 7 ngày",
  },
  {
    key: "4",
    stt: 4,
    tenSuKien: "Giỗ Bà Ngoại",
    duongLich: "20/12/2025",
    amLich: "20/11/2025",
    diaDiem: "Hà Nam",
    ghiChu: "Mời họ hàng",
    lapLai: "Hàng năm",
    thongBao: "Trước 5 ngày",
  },
  {
    key: "5",
    stt: 5,
    tenSuKien: "Họp mặt Gia tộc",
    duongLich: "05/01/2026",
    amLich: "07/12/2025",
    diaDiem: "Hải Phòng",
    ghiChu: "Chuẩn bị ảnh gia phả",
    lapLai: "Hàng năm",
    thongBao: "Trước 2 ngày",
  },
];

function AdminEventList() {
  const [popup, setPopup] = useState<boolean>(false);

  useEffect(() => {
      if (popup) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }, [popup]);

  return (
    <div className="adminEventList-container">
      <Breadcrumb
        style={{ fontSize: "18px" }}
        items={[
          {
            title: (
              <a
                className="h3"
                href="/admin/su-kien"
                style={{ color: "var(--color-gray)" }}
              >
                Sự kiện
              </a>
            ),
          },
          {
            title: (
              <div className="h3" style={{ color: "var(--color-dark-3)" }}>
                Danh sách sự kiện
              </div>
            ),
          },
        ]}
      />

      {/* Nội dung trang */}
      <div style={{ marginTop: 24 }}>
        <div className="tool">
          <div className="tool-left">
            <label htmlFor="select-options" className="label-select p2-r">
              Hiển thị
            </label>
            <select
              id="select-options"
              className="select-options"
              name="select-options"
              value="5"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="tool-right">
            <Search placeholder="Tìm kiếm sự kiện" />
            <Button
              icon="add"
              text="Thêm sự kiện"
              onClick={(e: React.MouseEvent) => {
                setPopup(true);
              }}
            />
          </div>
        </div>

        <Table<DataType>
          dataSource={data}
          rowKey="key"
          pagination={false}
          scroll={{ x: "max-content" }}
        >
          <Column
            title="STT"
            dataIndex="stt"
            key="stt"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Tên sự kiện"
            dataIndex="tenSuKien"
            key="tenSuKien"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Dương lịch"
            dataIndex="duongLich"
            key="duongLich"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Âm lịch"
            dataIndex="amLich"
            key="amLich"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Địa điểm"
            dataIndex="diaDiem"
            key="diaDiem"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Ghi chú"
            dataIndex="ghiChu"
            key="ghiChu"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Lặp lại"
            dataIndex="lapLai"
            key="lapLai"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Thông báo"
            dataIndex="thongBao"
            key="thongBao"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Thao tác"
            key="action"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
            render={(_: any, record: DataType) => (
              <Space size="middle">
                <span className="material-symbols-outlined btn-edit">edit</span>
                <span className="material-symbols-outlined btn-delete">
                  delete
                </span>
              </Space>
            )}
          />
        </Table>

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

      {popup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <p className="popup-title p1-b">Thêm sự kiện</p>
              <span
                className="material-symbols-outlined close-btn"
                onClick={() => setPopup(false)}
              >
                close
              </span>
            </div>

            {/* Form inputs */}
            <div className="form-group">
              <label htmlFor="tenSuKien">Tên sự kiện</label>
              <input
                type="text"
                id="tenSuKien"
                placeholder="Nhập tên sự kiện"
              />
            </div>

            <div className="form-group">
              <label htmlFor="loaiLich">Loại lịch</label>
              <div className="select-wrapper">
                <select id="loaiLich">
                  <option value="duong">Dương lịch</option>
                  <option value="am">Âm lịch</option>
                </select>
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="thoiGian">Thời gian</label>
              <input type="date" id="thoiGian" />
            </div>

            <div className="form-group">
              <label htmlFor="diaDiem">Địa điểm</label>
              <input type="text" id="diaDiem" placeholder="Nhập địa điểm" />
            </div>

            <div className="form-group">
              <label htmlFor="ghiChu">Ghi chú</label>
              <input type="text" id="ghiChu" placeholder="Nhập ghi chú" />
            </div>

            <div className="form-group">
              <label htmlFor="lapLai">Lặp lại</label>
              <div className="select-wrapper">
                <select id="lapLai">
                  <option value="none">Không lặp lại</option>
                  <option value="yearly">Hàng năm</option>
                  <option value="monthly">Hàng tháng</option>
                  <option value="weekly">Hàng tuần</option>
                </select>
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="thongBao">Thông báo</label>
              <div className="select-wrapper">
                <select id="thongBao">
                  <option value="1">Trước 1 ngày</option>
                  <option value="3">Trước 3 ngày</option>
                  <option value="5">Trước 5 ngày</option>
                  <option value="7">Trước 7 ngày</option>
                </select>
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEventList;
