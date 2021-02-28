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