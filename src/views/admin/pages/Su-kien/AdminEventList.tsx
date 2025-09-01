import "./AdminEventList.css";
import { Breadcrumb, Space, Table } from "antd";

import Search from "../../../../components/Search/Search";
import Button from "../../../../components/Button/Button";

const { Column } = Table;

interface DataType {
  key: React.Key;
  stt: number; // Số thứ tự
  tenSuKien: string; // Tên sự kiện
  duongLich: string; // Ngày dương
  amLich: string; // Ngày âm
  diaDiem: string; // Địa điểm
  ghiChu?: string; // Ghi chú (optional)
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
            <Button icon="add" text="Thêm sự kiện" />
          </div>
        </div>

        <Table<DataType> dataSource={data} rowKey="key" pagination={false}>
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
                <span className="material-symbols-outlined">edit</span>
                <span className="material-symbols-outlined">delete</span>
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
    </div>
  );
}

export default AdminEventList;
