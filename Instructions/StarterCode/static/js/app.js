// Create inititialization function
// This will populate the dropdown with IDs found in 'names' in the dataset
function init() {
    var selection = d3.select("#selDataset");
    // Call in dataset  
    d3.json("./data/samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selection.append("option").text(sample).property("value", sample);
      });
      // Set constant reference for initial plot on screen
      const sample1 = sampleNames[0];
      bellyCharts(sample1);
      pullMetadata(sample1);
    });
  }
// Call in metadata from dataset to fill metadata panel
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

// Function to create display charts
function bellyCharts(sample) {
  d3.json("./data/samples.json").then((data) => {
    var samples= data.samples;
    var metaArray= samples.filter(metaObject => metaObject.id == sample);
    var result= metaArray[0]
    // Create variables from 'samples'
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    // Bubble Chart Layout
    var bubbleLayout = {
      margin: { t: 0 },
      xaxis: { title: "IDs" },
      hovermode: "closest",
      };
    // Using 'samples' variables to create bubble chart dataset  
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
    // Plot bubble chart
    Plotly.plot("bubble", bubbleData, bubbleLayout);

    // Bar Chart Layout
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };
    // Using 'samples' variables to create bar chart dataset  
    var barData =[
      {
        y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x: values.slice(0,10).reverse(),
        text: labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"

      }
    ];
    // Plot bar chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Assigns functions when optionChanged 
function optionChanged(newSample) {
  bellyCharts(newSample);
  pullMetadata(newSample);
}

// Start initialization function
init();
