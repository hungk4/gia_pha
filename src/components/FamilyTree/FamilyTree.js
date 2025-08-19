import { useEffect, useRef } from "react";
import * as d3 from "d3";

import "./FamilyTree.css";

import rongTrai from "../../assets/images/rongTrai.png"
import rongPhai from "../../assets/images/rongPhai.png"
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
      children: [
        { name: "F", gender: "female" },
        { name: "G", gender: "male" },
      ],
    },
  ],
};

function FamilyTree() {
  const svgRef = useRef();

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

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2 - rectWidth / 2}, 150)`);

    // // Zoom behavior
    // const zoom = d3
    //   .zoom()
    //   .scaleExtent([0.3, 2]) // Giới hạn zoom nhỏ nhất 30%, lớn nhất 200%
    //   .on("zoom", (event) => {
    //     g.attr("transform", event.transform); // Cập nhật transform khi zoom/pan
    //   });

    // // Gắn zoom vào svg
    // svg.call(zoom);

    // // Reset về mặc định khi double-click
    // svg.on("dblclick", () => {
    //   svg
    //     .transition()
    //     .duration(750)
    //     .call(
    //       zoom.transform,
    //       d3.zoomIdentity.translate(width / 2 - rectWidth / 2, 200).scale(1) // reset pan + scale
    //     );
    // });

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
          <div class="name">${d.data.name}</div>
          <div class="year">${d.data.year || "19xx"}</div>
        `);

      // Vẽ couple
      if (d.data.couple && d.data.couple.length > 0) {
        d.data.couple.forEach((c, i) => {
          const offsetX = rectWidth * (i + 1); // khoảng cách giữa các cặp vợ chồng
          const coupleG = group
            .append("g")
            .attr("class", `node ${c.gender}`)
            .attr("transform", `translate(${offsetX},0)`);

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
        <div class="name">${c.name}</div>
      `);
        });
      }
    });
  }, []);

  return (
    <div className="family-tree-container">
      <div className="title-board">
        <div class="dragon">
          <img src={rongTrai} alt="rongTrai"></img>
        </div>
        <div className="board">
          <img src={board} alt="board"></img>
          <p className="h4">Gia phả họ Nguyễn</p>
        </div>
        <div class="dragon">
          <img src={rongPhai} alt="rongPhai"></img>
        </div>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default FamilyTree;
