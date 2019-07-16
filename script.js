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

  const margin = 70;
  const w = 1000 - margin * 2;
  const h = 450;

  const myTimeFormat = d3.timeFormat("%Y-%m-%d");

  const xScale = d3
    .scaleTime()
    .domain([
      new Date(d3.min(json.data.map(d => d[0]))),
      new Date(d3.max(json.data.map(d => d[0])))
    ])
    .range([0, w]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(json.data, d => d[1])])
    .range([h, 0]);

  let svg = d3
    .select("main")
    .append("svg")
    .attr("width", w + margin + margin)
    .attr("height", h + margin + margin)
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .style("background-color", "white");

  svg.append("g").call(d3.axisLeft(yScale));

  svg
    .append("g")
    .attr("transform", `translate(0, ${h})`)
    .call(d3.axisBottom(xScale));

  svg
    .append("text")
    .attr("transform", "translate(" + w / 2 + " ," + (h + 40) + ")")
    .style("text-anchor", "middle")
    .text("Date");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin)
    .attr("x", 0 - h / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Value");

  svg
    .selectAll("rect")
    .data(json.data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(new Date(d[0])))
    .attr("y", d => yScale(d[1]))
    .attr("width", 3)
    .attr("height", d => h - yScale(d[1]))
    .attr("fill", "#840032")
    .attr("class", "bar")
    .append("title")
    .text(d => d[1]);

  svg
    .selectAll("text")
    .data(json.data)
    .enter()
    .append("text")
    .attr("x", d => xScale(new Date(d[0])))
    .attr("y", d => yScale(d[1]))
    .text(d => d[0].substring(5))
    .attr("font-size", "5px");

  svg
    .append("text")
    .attr("x", w / 2)
    .attr("y", 0 - margin / 2 + 50)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Value vs Date Graph");
};
// })
