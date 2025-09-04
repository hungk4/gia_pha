
import { Breadcrumb, Space, Table } from "antd";
import Column from "antd/es/table/Column";

import "./AdminGiaphaUserList.css";
import Search from "../../../../components/Search/Search";

interface DataType {
  key: React.Key;
  stt: number;
  hoten: string;
  ngaysinh: string;
  ngaymat: string;
  hientrang: string;
}

const data: DataType[] = [
  {
    key: "1",
    stt: 1,
    hoten: "Nguyễn Văn A",
    ngaysinh: "12/03/1950",
    ngaymat: "20/08/2020",
    hientrang: "Đã mất",
  },
  {
    key: "2",
    stt: 2,
    hoten: "Nguyễn Văn A",
    ngaysinh: "05/07/1980",
    ngaymat: "--/--/----",
    hientrang: "Còn sống",
  },
  {
    key: "3",
    stt: 3,
    hoten: "Nguyễn Văn A",
    ngaysinh: "22/11/1990",
    ngaymat: "--/--/----",
    hientrang: "Còn sống",
  },
  {
    key: "4",
    stt: 4,
    hoten: "Nguyễn Văn A",
    ngaysinh: "14/04/2000",
    ngaymat: "--/--/----",
    hientrang: "Còn sống",
  },
  {
    key: "5",
    stt: 5,
    hoten: "Nguyễn Văn A",
    ngaysinh: "30/09/2010",
    ngaymat: "--/--/----",
    hientrang: "Còn sống",
  },
];


function AdminGiaphaUserList() {
  return (
    <div className="adminGiaphasUserList-container">
      <Breadcrumb
        style={{ fontSize: "18px" }}
        items={[
          {
            title: (
              <a
                className="h3"
                href="/admin/gia-pha"
                style={{ color: "var(--color-gray)" }}
              >
                Gia phả
              </a>
            ),
          },
          {
            title: (
              <div className="h3" style={{ color: "var(--color-dark-3)" }}>
                Danh sách thành viên
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
            <Search placeholder="Tìm kiếm thành viên" />
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
            title="Ngày sinh"
            dataIndex="ngaysinh"
            key="ngaysinh"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Ngày mất"
            dataIndex="ngaymat"
            key="ngaymat"
            onHeaderCell={() => ({ className: "p2-b" })}
            onCell={() => ({ className: "p2-r" })}
          />
          <Column
            title="Hiện trạng"
            dataIndex="hientrang"
            key="hientrang"
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
    </div>
  );
}

export default AdminGiaphaUserList;
