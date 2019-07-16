// document.addEventListener("DOMContentLoaded", () => {
let plot = document.querySelector("#plot");
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

  // define x and y scales
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

  // define svg plot area
  let svg = d3
    .select("main")
    .append("svg")
    .attr("width", w + margin + margin)
    .attr("height", h + margin + margin)
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .style("background-color", "white");

  // add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${h})`)
    .call(d3.axisBottom(xScale));

  // add y-axis
  svg.append("g").call(d3.axisLeft(yScale));

  // add x-axis label
  svg
    .append("text")
    .attr("transform", "translate(" + w / 2 + " ," + (h + 40) + ")")
    .style("text-anchor", "middle")
    .text("Year");

  // add y-axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin)
    .attr("x", 0 - h / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Gross Domestic Product");

  // Define the div for the tooltip
  let toolTip = d3
    .select("main")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // add bars
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
    // .append("title")
    // .text(d => d[1])
    .on("mouseover", d => {
      const year = d[0].substring(0, 4);
      const month = d[0].substring(5, 7);
      console.log(month);
      const quarter = () => {
        if (month < 4) {
          return "Q1";
        } else if (month < 7) {
          return "Q2";
        } else if (month < 10) {
          return "Q3";
        } else {
          return "Q4";
        }
      };
      console.log(quarter());
      console.log(year);
      toolTip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      toolTip
        .html(`Year: ${year} ${quarter()}<br/>$${d[1]} Billion`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", d => {
      toolTip
        .transition()
        .duration(500)
        .style("opacity", 0);
    });

  // add the plot title
  svg
    .append("text")
    .attr("x", w / 2)
    .attr("y", 0 - margin / 2 + 50)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("GDP vs Date Graph");
};
// })
