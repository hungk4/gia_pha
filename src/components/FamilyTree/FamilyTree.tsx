import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type {
  Person,
  FamilyTreeState,
} from "../../redux/familyTree/familyTreeSlice";

import { useNavigate } from "react-router-dom";

import "./FamilyTree.css";

import rongTrai from "../../assets/images/rongTrai.png";
import rongPhai from "../../assets/images/rongPhai.png";
import board from "../../assets/images/cuonthu.png";
import avatar from "../../assets/images/avatar.jpg";

interface FamilyTreeProps {
  mode?: "admin" | "client";
  data: FamilyTreeState;
}

function FamilyTree({ mode = "client", data }: FamilyTreeProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Dữ liệu cây và kết quả tìm kiếm
  const familyData = data.root;
  const searchResults = data.searchResults;

  // popup action
  interface PopupData {
    x: number;
    y: number;
    data: Person;
  }
  const [popup, setPopup] = useState<PopupData | null>(null);

  const navigate = useNavigate();

  function closePopup() {
    setPopup(null);
  }

  useEffect(() => {
    const container = svgRef.current?.parentElement;
    if (!container) return;

    const renderTree = () => {
      // Xét kích thước của SVG
      // const svgElement = svgRef.current;
      const width =
        svgRef.current?.parentElement?.getBoundingClientRect().width || 0;
      const height = 1000;

      // Kích thước của hình chữ nhật node
      const rectWidth = 150;
      const rectHeight = 188;

      // 1. Chuẩn bị root và treeLayout
      const root = d3.hierarchy<Person>(familyData);

      // Tao layout tree
      const treeLayout = d3
        .tree<Person>()
        .nodeSize([190, 268]) // 190 = 150 + 40, 40 là gap 2 node, 268 = 188 + 80, 80 là gap giữa parent và child
        .separation((a, b) => {
          // ép kiểu để TypeScript biết data có kiểu Person.
          const nodeA = a as d3.HierarchyNode<Person>;
          const nodeB = b as d3.HierarchyNode<Person>;

          const widthA =
            rectWidth +
            (nodeA.data.couple ? nodeA.data.couple.length * rectWidth : 0); // width thực tế của node a nếu có thêm couple
          const widthB =
            rectWidth +
            (nodeB.data.couple ? nodeB.data.couple.length * rectWidth : 0); // width thực tế của node b nếu có thêm couple
          return (
            ((a.parent === b.parent ? 1 : 1.5) * Math.max(widthA, widthB)) /
            rectWidth // khoảng cách giữa các node cùng cha là 1.5 lần chiều rộng lớn nhất của chúng * thêm width thực tế của 1 node nếu có thêm couple / rectWidth để lấy tỉ lệ
          );
        });
      treeLayout(root);

      const svg = d3
        .select<SVGSVGElement, unknown>(svgRef.current!)
        .attr("width", width)
        .attr("height", height);
      svg.selectAll("*").remove();

      // Vị trí ban đầu của cây để cây nằm giữa khung
      const initialX = width / 2 - rectWidth / 2;
      const initialY = 150;

      const g = svg
        .append("g")
        .attr("transform", `translate(${initialX}, ${initialY})`);

      // 2 Thiết lập zoom
      // ---- 2.1 Tạo zoom behavior
      const myZoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", (e) => {
        g.attr("transform", e.transform);
      });

      // ---- 2.2 Gọi zoom vào svg
      svg.call(myZoom);

      // ---- 2.3 Áp dụng transform ban đầu để cây nằm giữa
      const initialTransform = d3.zoomIdentity
        .translate(initialX, initialY)
        .scale(1);

      myZoom.transform(svg, initialTransform); // tương đương svg.call(myZoom.transform, initialTransform);

      // 3. Vẽ link
      g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke", "#555")
        .attr("stroke-width", 2)
        .attr("x1", (d) => d.source.x!) // dấu ! để Typescript hiểu giá trị chắc chắn 0 undefined
        .attr("y1", (d) => d.source.y! + rectHeight / 2)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y! - rectHeight / 2);

      // 4. Vẽ node + couple
      const nodes = g
        .selectAll(".node-group")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node-group")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

      nodes.each(function (d) {
        const group = d3.select(this);

        // Vẽ node chính
        const mainNode = group
          .append("g")
          .attr("class", `node ${d.data.gender}`)
          .attr("transform", `translate(0,0)`);

        mainNode
          .append("rect")
          .attr("x", -rectWidth / 2)
          .attr("y", -rectHeight / 2)
          .attr("width", rectWidth)
          .attr("height", rectHeight)
          .attr("fill", "#ffffff")
          .attr(
            "stroke",
            searchResults.some((r) => r.name === d.data.name)
              ? "red"
              : d.data.gender === "male"
              ? "#81B1EC"
              : "#EEC94A"
          )
          .attr("stroke-width", 2)
          .attr("rx", 8)
          .attr("ry", 8);

        mainNode
          .append("foreignObject")
          .attr("x", -rectWidth / 2)
          .attr("y", -rectHeight / 2)
          .attr("width", rectWidth)
          .attr("height", rectHeight)
          .append("xhtml:div")
          .attr("class", "node-content").html(`
          <div class="node-tool">
            <button class="tool-btn">
              <span class="material-symbols-outlined">notes</span>
            </button>
          </div>
          <div class="avatar">
            <img src="${avatar}" alt="avatar" />
          </div>
          <div class="name p2-b">${d.data.name}</div>
          <div class="year p2-b">${d.data.year || "19xx"}</div>
        `);

        // Gắn sự kiện cho nút tool-btn
        const toolBtn = mainNode.node()?.querySelector(".tool-btn");
        if (toolBtn) {
          d3.select(toolBtn).on("click", (event) => {
            event.stopPropagation();

            const container = document.querySelector(
              ".family-tree-container"
            ) as HTMLElement;
            const rect = container.getBoundingClientRect();

            setPopup({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
              data: d.data,
            });
          });
        }

        // Vẽ couple
        if (d.data.couple && d.data.couple.length > 0) {
          d.data.couple.forEach((c, i) => {
            const offsetX = rectWidth * (i + 1); // khoảng cách giữa các cặp vợ chồng
            const coupleG = group
              .append("g")
              .attr("class", `node ${c.gender}`)
              .attr("transform", `translate(${offsetX + 2},0)`);

            coupleG
              .append("rect")
              .attr("x", -rectWidth / 2)
              .attr("y", -rectHeight / 2)
              .attr("width", rectWidth)
              .attr("height", rectHeight)
              .attr("fill", "#ffffff")
              .attr(
                "stroke",
                searchResults.some((r) => r.name === c.name)
                  ? "red"
                  : c.gender === "male"
                  ? "#81B1EC"
                  : "#EEC94A"
              )
              .attr("stroke-width", 2)
              .attr("rx", 8)
              .attr("ry", 8);

            coupleG
              .append("foreignObject")
              .attr("x", -rectWidth / 2)
              .attr("y", -rectHeight / 2)
              .attr("width", rectWidth)
              .attr("height", rectHeight)
              .append("xhtml:div")
              .attr("class", "node-content").html(`
              <div class="node-tool">
                <button class="tool-btn">
                  <span class="material-symbols-outlined">notes</span>
                </button>
              </div>
              <div class="avatar">
                <img src="${avatar}" alt="avatar" />
              </div>
              <div class="name p2-b">${c.name}</div>
              <div class="year p2-b">${c.year || "19xx"}</div>
            `);

            // Gắn sự kiện cho nút tool-btn
            const toolBtn = coupleG.node()?.querySelector(".tool-btn");
            if (toolBtn) {
              d3.select(toolBtn).on("click", (event) => {
                event.stopPropagation();

                const container = document.querySelector(
                  ".family-tree-container"
                ) as HTMLElement;
                const rect = container.getBoundingClientRect();

                setPopup({
                  x: event.clientX - rect.left,
                  y: event.clientY - rect.top,
                  data: c,
                });
              });
            }
          });
        }
      });

      // 5. Nếu có kết quả search thì zoom vào thành viên đầu tiên
      if (searchResults.length > 0) {
        const target = searchResults[0]!; // thành viên đầu tiên trong mảng
        const targetName = target.name.toLowerCase();

        let firstMatch: d3.HierarchyNode<Person> | null = null;
        let coupleOffsetX = 0;

        root.descendants().some((d) => {
          // so sánh node chính
          if (d.data.name.toLowerCase() === targetName) {
            firstMatch = d;
            return true;
          }

          // so sánh trong couple
          d.data.couple.some((c, i) => {
            if (c.name.toLowerCase() === targetName) {
              firstMatch = d; // node chính
              coupleOffsetX = 150 * (i + 1); // dịch sang cặp
              return true;
            }
            return false;
          });

          if(firstMatch) return true;

          return false;
        });

        if (firstMatch) {
          const targetX = ((firstMatch as any).x ?? 0) + coupleOffsetX;
          const targetY = (firstMatch as any).y ?? 0;

          const scale = 1.5;
          const translateX = width / 2 - targetX * scale;
          const translateY = 200 - targetY * scale;

          const t = d3.zoomIdentity
            .translate(translateX, translateY)
            .scale(scale);

          svg.transition().duration(750).call(myZoom.transform, t);
        }
      }
    };
    renderTree();

    // observer theo dõi container thay đổi (do collapsed hoặc resize)
    const observer = new ResizeObserver(() => {
      renderTree();
    });
    observer.observe(container);

    // cleanup khi unmount
    return () => observer.disconnect();
  }, [familyData, searchResults]);

  return (
    <div className="family-tree-container">
      <div className="title-board">
        <div className="dragon">
          <img src={rongTrai} alt="rongTrai"></img>
        </div>
        <div className="board">
          <img src={board} alt="board"></img>
          <p className="h4">Gia phả họ Nguyễn</p>
        </div>
        <div className="dragon">
          <img src={rongPhai} alt="rongPhai"></img>
        </div>
      </div>
      <svg ref={svgRef}></svg>

      {popup && (
        <div
          className="popup-menu p2-r"
          style={{ position: "absolute", left: popup.x, top: popup.y }}
        >
          <span
            className="material-symbols-outlined close-btn"
            onClick={closePopup}
          >
            close
          </span>
          <div className="menu-title">Hành động</div>
          {mode === "admin" && (
            <button onClick={() => navigate(`/admin/gia-pha/them-con/${popup.data.id}`)}>
              Thêm con
            </button>
          )}

          {mode === "admin" && (
            <button onClick={() => navigate(`/admin/gia-pha/them-hon-phu/${popup.data.id}`)}>
              Thêm hôn phu
            </button>
          )}

          <button
            onClick={() => {
              if (mode === "admin") {
                navigate(`/admin/gia-pha/chinh-sua/${popup.data.id}`);
              } else {
                console.log("Xem chi tiết", popup.data);
                navigate(`/gia-pha/chi-tiet`);
              }
            }}
          >
            {mode === "admin" ? "Chỉnh sửa" : "Xem chi tiết"}
          </button>

          <button onClick={() => console.log("Xem đời sau")}>
            Xem đời sau
          </button>
          <button onClick={() => console.log("Trở về gốc")}>Trở về gốc</button>

          {mode === "admin" && (
            <button onClick={() => console.log("Xóa")}>Xóa</button>
          )}
        </div>
      )}
    </div>
  );
}

export default FamilyTree;
