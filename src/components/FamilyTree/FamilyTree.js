import { useEffect, useRef } from "react";
import * as d3 from "d3";

import "./FamilyTree.css";

const familyData = {
  name: "A",
  children: [
    {
      name: "B",
      children: [{ name: "D" }, { name: "E" }, { name: "M" }],
    },
    {
      name: "C",
      children: [{ name: "F" }, { name: "G" }],
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
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.5)); // cùng cha thì khoảng cách là 190, khác cha thì 60

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
      .attr("class", "node")
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
      .attr("stroke", "#555")
      .attr("stroke-width", 2);

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
        <span class="material-symbols-outlined">more_vert</span>
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
