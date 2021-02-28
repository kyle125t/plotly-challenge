// Pull metadata from samples.json file for panel
function getMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var metaArray = metadata.filter(bellySample => bellySample.id == sample);
    var result = metaArray[0];
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}

// Pull metadata from samples.json to make charts
function createChart(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var metaArray = samples.filter(bellySample => bellySample.id == sample);
    var result = metaArray[0];
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    var bubbleChart = {
      xaxis: { title: "IDs"},
      hovermode: "closest"
      };
      var bubbleData = [
        {
          x: ids,
          y: values,
          text: labels,
          mode: "markers",
          color: ids,
          size: values
        }
      ];
      Plotly.plot("bubble", bubbleChart, createChart);
  })
}