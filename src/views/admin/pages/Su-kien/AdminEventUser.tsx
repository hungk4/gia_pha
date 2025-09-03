import "./AdminEventUser.css";

import { Breadcrumb, Space, Table } from "antd";
import Search from "../../../../components/Search/Search";
import Column from "antd/es/table/Column";
import { useState } from "react";

interface DataType {
  key: React.Key;
  stt: number;
  hoten: string;
  sdt: string;
  events: string[];
}

const data: DataType[] = [
  {
    key: "1",
    stt: 1,
    hoten: "Nguyễn Văn A",
    sdt: "0912345678",
    events: ["Sinh nhật Bố", "Giỗ Ông Nội"],
  },
  {
    key: "2",
    stt: 2,
    hoten: "Trần Thị B",
    sdt: "0987654321",
    events: ["Kỷ niệm ngày cưới Bố Mẹ"],
  },
  {
    key: "3",
    stt: 3,
    hoten: "Phạm Văn C",
    sdt: "0901234567",
    events: ["Giỗ Bà Ngoại", "Họp mặt Gia tộc"],
  },
];

function AdminEventUser() {
  const [popup, setPopup] = useState<boolean>(false);

  return (
    <div className="adminEventUser-container">
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
                Danh sách người nhận thông báo
              </div>
            ),
          },
        ]}
      />

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
            title="Họ tên"
            dataIndex="hoten"
            key="hoten"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Số điện thoại"
            dataIndex="sdt"
            key="sdt"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Sự kiện nhận thông báo"
            dataIndex="events"
            key="events"
            render={(events: string[]) => events.join(", ")}
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Thao tác"
            key="action"
            align="center"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
            render={(_: any, record: DataType) => (
              <Space size="middle">
                <span
                  className="material-symbols-outlined btn-delete"
                  onClick={(e: React.MouseEvent) => {
                    setPopup(true);
                  }}
                >
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

        {popup && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="text-content">
                <div className="headline">Xác nhận xóa</div>
                <div className="supporting-text">Bạn có chắc chắn muốn xóa người này khỏi danh sách nhận thông báo?</div>
              </div>
              <div className="actions">
                <button
                  className="btn-cancel p2-r"
                  onClick={() => setPopup(false)}
                >
                  Xóa
                </button>
                <button
                  className="btn-confirm p2-r"
                  onClick={() => setPopup(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEventUser;
