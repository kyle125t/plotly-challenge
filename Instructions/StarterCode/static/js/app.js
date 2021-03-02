function init() {
    var selection = d3.select("#selDataset");
  
    d3.json("./data/samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selection.append("option").text(sample).property("value", sample);
      });
  
      const sample1 = sampleNames[0];
      bellyCharts(sample1);
      pullMetadata(sample1);
    });
  }

function pullMetadata(sample) {
    d3.json("./data/samples.json").then((data) => {
      var metadata= data.metadata;
      var metaArray= metadata.filter(metaObject => metaObject.id == sample);
      var result= metaArray[0];
      var infoPanel = d3.select("#sample-metadata");
      infoPanel.html("");
      Object.entries(result).forEach(([key, value]) => {
        infoPanel.append("h6").text(`${key}: ${value}`);
      });    
    });
  }


function bellyCharts(sample) {

  d3.json("./data/samples.json").then((data) => {
    var samples= data.samples;
    var metaArray= samples.filter(metaObject => metaObject.id == sample);
    var result= metaArray[0]

    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    var bubbleLayout = {
      margin: { t: 0 },
      xaxis: { title: "IDs" },
      hovermode: "closest",
      };

      var bubbleData = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          }
      }
    ];

    Plotly.plot("bubble", bubbleData, bubbleLayout);

     var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    var barData =[
      {
        y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x: values.slice(0,10).reverse(),
        text: labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"

      }
    ];

    Plotly.newPlot("bar", barData, barLayout);
  });
}

function optionChanged(newSample) {
  bellyCharts(newSample);
  pullMetadata(newSample);
}

// Initialize main function
init();
