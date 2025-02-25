import React, { useEffect, useRef } from "react";
import useMeasure from "react-use-measure";
import * as d3 from "d3";
const PowerAverageLineChart = ({ data }) => {
  const svgRef = useRef();
  const [lRef, dimensions] = useMeasure();

  useEffect(() => {
    const margin = { top: 2, left: 0, right: 0, bottom: 0 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    if (svgRef.current !== undefined) {
      const svg = d3
        .select(svgRef.current)
        .join("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .style(
          "transform",
          `translate(${margin.left}px,${dimensions.height / 2 + margin.top})px`
        );
      const max = d3.max(data, (d: any) => d.pointValue);
      const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);
      const yScale = d3
        .scaleLinear()
        .domain([0, parseFloat(max)])
        .range([height, 0]);
      //   const colorScale = d3
      //     .scaleLinear(d3.interpolateRgbBasis(["#ff4b9f", "#50d9f0"]))
      //     .domain(d3.extent(data, (d) => d.pointValue));
      svg
        .append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", 30)
        .selectAll("stop")
        .data([
          { offset: "0%", color: "#ff4b9f" },
          { offset: "100%", color: "#50d9f0" },
        ])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
          return d.offset;
        })
        .attr("opacity", function (d) {
          return d.offset;
        })
        .attr("stop-color", function (d) {
          return d.color;
        });

      const line = svg
        .datum(data)
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 1.7)
        .attr(
          "d",
          d3
            .line()
            .x((d, i) => xScale(i))
            .y((d: any) => yScale(d.pointValue))
            .curve(d3.curveCatmullRom)
        );
    }
  }, [data, dimensions]);

  return (
    <div ref={lRef} className="h-full w-full">
      <svg key={`key`} className="h-full w-full " ref={svgRef} />
    </div>
  );
};

export default PowerAverageLineChart;
