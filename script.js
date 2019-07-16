// document.addEventListener("DOMContentLoaded", () => {
let plot = document.querySelector("#plot");
// console.log(plot);
request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  true
);
request.send();
request.onload = () => {
  json = JSON.parse(request.responseText);
  console.log(JSON.stringify(json.data));

  const w = 900;
  const h = 450;
  const padding = 30;
  const myTimeFormat = d3.timeFormat("%Y-%m-%d");
  console.log(myTimeFormat);

  console.log(new Date(d3.min(json.data.map(d => d[0]))));
  console.log(new Date(d3.max(json.data.map(d => d[0]))));

  const xScale = d3
    .scaleTime()
    .domain([
      new Date(d3.min(json.data.map(d => d[0]))),
      new Date(d3.max(json.data.map(d => d[0])))
    ])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(json.data, d => d[1])])
    .range([h, 0]);

  console.log(yScale(1000));

  const svg = d3
    .select("header")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "grey");

  svg
    .selectAll("rect")
    .data(json.data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(new Date(d[0])))
    .attr("y", d => yScale(d[1]))
    .attr("width", 3)
    .attr("height", d => h - yScale(d[1]))
    // .attr("x", (d, i) => i * 3.2)
    // .attr("y", (d, i) => {
    //   return h - d[1] / 50;
    // })
    .attr("fill", "blue")
    .attr("class", "bar")
    .append("title")
    .text(d => d[1]);

  svg
    .selectAll("text")
    .data(json.data)
    .enter()
    .append("text")
    .attr("x", (d, i) => i * 3.2)
    .attr("y", (d, i) => {
      return h - d[1] / 50 - 10;
    })
    .text(d => d[0].substring(5))
    .attr("font-size", "5px");

  d3.select("#plot")
    .selectAll("div")
    .data(json.data)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("width", "2px")
    .style("height", d => d[1] / 50 + "px")
    .style("margin", "0.5px")
    .style("background-color", "blue");
};
// })
