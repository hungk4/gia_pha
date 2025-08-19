import { useEffect, useRef } from "react";
import * as d3 from "d3";

import "./FamilyTree.css";

const familyData = {
  name: "A",
  gender: "male",
  couple: [
    { name: "A1", gender: "female" }
  ],
  children: [
    {
      name: "B",
      gender: "female",
      couple: [
        { name: "B1", gender: "male" } 
      ],
      children: [
        { name: "D", gender: "male" },
        { name: "E", gender: "female" },
        { name: "M", gender: "male" },
      ],
    },
    {
      name: "C",
      gender: "female",
      couple: [
        { name: "C1", gender: "male" }
      ],
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
    const svgElement = svgRef.current;
    const width = svgElement.parentElement.getBoundingClientRect().width;
    const height = 1000;

    const root = d3.hierarchy(familyData);

    const treeLayout = d3
      .tree()
      .nodeSize([190, 270]) // sibling 190px, parent-child 270px
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.5)); // cùng cha thì khoảng cách là 190, khác cha thì 285

    treeLayout(root);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${width / 2},200)`);

    // Vẽ đường nối
    const links = g
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#555")
      .attr("stroke-width", 2)
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    // Vẽ các node
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", (d) => `node ${d.data.gender || ""}`)
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    const rectWidth = 150;
    const rectHeight = 188;

    node
      .append("rect")
      .attr("x", -rectWidth / 2) // căn giữa rect theo x
      .attr("y", -rectHeight / 2) // căn giữa rect theo y
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("fill", "#ffffff")
      .attr("stroke", (d) => (d.data.gender === "male" ? "#81B1EC" : "#EEC94A"))
      .attr("stroke-width", 2)
      .attr("rx", 8)
      .attr("ry", 8);

    node
      .append("foreignObject")
      .attr("x", -rectWidth / 2)
      .attr("y", -rectHeight / 2)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .append("xhtml:div") // HTML namespace
      .attr("class", "node-content") // class CSS
      .html(
        (d) => `
            <div class="node-tool">
              <button class="tool-btn">
                <span class="material-symbols-outlined">notes</span>
              </button>
            </div>
            <div class="avatar"></div>
            <div class="name">${d.data.name}</div>
            <div class="year">${d.data.year || "19xx"}</div>
          `
      );
    
  }, []);

  return (
    <>
      <div className="family-tree-container">
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}

export default FamilyTree;
