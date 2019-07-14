// document.addEventListener("DOMContentLoaded", () => {
let plot = document.querySelector("#plot");
console.log(plot);
request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  true
);
request.send();
request.onload = () => {
  json = JSON.parse(request.responseText);
  // plot.innerHTML = JSON.stringify(json.data);
  console.log(JSON.stringify(json.data));

  const w = 900;
  const h = 450;
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
    .attr("width", 2)
    .attr("height", d => d[1] / 50)
    .attr("x", (d, i) => i * 3)
    .attr("y", (d, i) => {
      return h - d[1] / 50;
    })
    .style("color", "black");

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
  // .text((d, i) => d[1]);
};
// });
