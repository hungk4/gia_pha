import "./AdminCayGiaPha.css";
import { Breadcrumb } from "antd";
import Search from "../../../../components/Search/Search";
import Button from "../../../../components/Button/Button";
import FamilyTree from "../../../../components/FamilyTree/FamilyTree";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { clearSearch, searchMember } from "../../../../redux/familyTree/familyTreeSlice";

function AdminCayGiaPha() {
  const data = useSelector((state: RootState) => state.familyTree);
  const dispatch = useDispatch();

  // state biến tìm kiếm thành viên
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchMember(searchTerm));
    } else {
      dispatch(clearSearch());
    }
  }, [searchTerm, dispatch]);

  return (
    <div className="adminCayGiaPha-container">
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
                Cây gia phả
              </div>
            ),
          },
        ]}
      />

      <div style={{ marginTop: 24 }}>
        <div className="tool">
          <div className="tool-left">
            <Search
              placeholder="Tìm kiếm thành viên"
              icon=""
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <Search placeholder="Hiển thị số thế hệ" icon="eye_tracking" />
          </div>
          <div className="tool-right">
            <Button text="Xuất gia phả" />
          </div>
        </div>
        <FamilyTree mode="admin" data={data} />
      </div>
    </div>
  );
}

export default AdminCayGiaPha;
