import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { useNavigate } from "react-router-dom";

import "./FamilyTree.css";

import rongTrai from "../../assets/images/rongTrai.png";
import rongPhai from "../../assets/images/rongPhai.png";
import board from "../../assets/images/cuonthu.png";

const familyData = {
  name: "A",
  gender: "male",
  couple: [{ name: "A1", gender: "female" }],
  children: [
    {
      name: "B",
      gender: "female",
      couple: [{ name: "B1", gender: "male" }],
      children: [
        {
          name: "D",
          gender: "male",
          couple: [{ name: "D1", gender: "female" }],
        },
        { name: "E", gender: "female" },
        { name: "M", gender: "male" },
      ],
    },
    {
      name: "C",
      gender: "female",
      couple: [{ name: "C1", gender: "male" }],
      children: [{ name: "F", gender: "female" }],
    },
  ],
};

function FamilyTree() {
  const svgRef = useRef();

  const [popup, setPopup] = useState(null);

  const navigate = useNavigate();

  function closePopup() {
    setPopup(null);
  }

  useEffect(() => {
    // Xét kích thước của SVG
    const svgElement = svgRef.current;
    const width = svgElement.parentElement.getBoundingClientRect().width;
    const height = 1000;

    // Kích thước của hình chữ nhật node
    const rectWidth = 150;
    const rectHeight = 188;

    // Dùng d3.hierarchy
    const root = d3.hierarchy(familyData);

    // Tao layout tree
    const treeLayout = d3
      .tree()
      .nodeSize([190, 268]) // 190 = 150 + 40, 40 là gap 2 node, 268 = 188 + 80, 80 là gap giữa parent và child
      .separation((a, b) => {
        const widthA =
          rectWidth + (a.data.couple ? a.data.couple.length * rectWidth : 0); // width thực tế của node a nếu có thêm couple
        const widthB =
          rectWidth + (b.data.couple ? b.data.couple.length * rectWidth : 0); // width thực tế của node b nếu có thêm couple
        return (
          ((a.parent === b.parent ? 1 : 1.5) * Math.max(widthA, widthB)) /
          rectWidth // khoảng cách giữa các node cùng cha là 1.5 lần chiều rộng lớn nhất của chúng * thêm width thực tế của 1 node nếu có thêm couple / rectWidth để lấy tỉ lệ
        );
      });
    treeLayout(root);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();

    // Vị trí ban đầu của cây để cây nằm giữa khung
    const initialX = width / 2 - rectWidth / 2;
    const initialY = 150;

    const g = svg
      .append("g")
      .attr("transform", `translate(${initialX}, ${initialY})`);

    
    // Thiết lập zoom
    // 1. Tạo zoom behavior
    const myZoom = d3.zoom().on("zoom", (e) => {
      g.attr("transform", e.transform);
    });

    // 2. Gọi zoom vào svg
    svg.call(myZoom);

    // 3. Áp dụng transform ban đầu để cây nằm giữa
    const initialTransform = d3.zoomIdentity
      .translate(initialX, initialY)
      .scale(1);
    svg.call(myZoom.transform, initialTransform);


    // Vẽ link
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#555")
      .attr("stroke-width", 2)
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y + rectHeight / 2)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y - rectHeight / 2);

    // Vẽ node + couple
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
        .attr("stroke", d.data.gender === "male" ? "#81B1EC" : "#EEC94A")
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
          <div class="avatar"></div>
          <div class="name p2-b">${d.data.name}</div>
          <div class="year p2-b">${d.data.year || "19xx"}</div>
        `);

      // Gắn sự kiện cho nút tool-btn
      d3.select(mainNode.node().querySelector(".tool-btn")).on(
        "click",
        (event) => {
          event.stopPropagation();
          setPopup({
            x: event.pageX,
            y: event.pageY,
            data: d.data,
          });
        }
      );

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
            .attr("stroke", c.gender === "male" ? "#81B1EC" : "#EEC94A")
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
              <div class="avatar"></div>
              <div class="name p2-b">${c.name}</div>
              <div class="year p2-b">${c.year || "19xx"}</div>
            `);

          // Gắn sự kiện cho nút tool-btn
          d3.select(coupleG.node().querySelector(".tool-btn")).on(
            "click",
            (event) => {
              event.stopPropagation();
              setPopup({
                x: event.pageX,
                y: event.pageY,
                data: c,
              });
            }
          );
        });
      }
    });
  }, []);

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
            class="material-symbols-outlined close-btn"
            onClick={closePopup}
          >
            close
          </span>
          <div className="menu-title">Hành động</div>
          <button
            onClick={() => {
              console.log("Xem chi tiết", popup.data);
              navigate(`/gia-pha/chi-tiet`);
            }}
          >
            Xem chi tiết
          </button>
          <button onClick={() => console.log("Xem đời sau")}>
            Xem đời sau
          </button>
          <button onClick={() => console.log("Trở về gốc")}>Trở về gốc</button>
        </div>
      )}
    </div>
  );
}

export default FamilyTree;
