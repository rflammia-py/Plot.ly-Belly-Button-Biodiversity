function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => 
        sampleobject.id == sample);
      var result= resultsarray[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
    });
}
console.log

function buildCharts(sample) {

// Use `d3.json` to fetch the sample data for the plots
d3.json("samples.json").then((data) => {
  var samples= data.samples;
  var resultsarray= samples.filter(sampleobject => 
      sampleobject.id == sample);
  var result= resultsarray[0]

  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;

  // Build a BUBBLE Chart 
//------------------------------------------------------//
var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "IDs" },
    hovermode: "closest",
    };

    var DataBubble = [ 
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

Plotly.plot("bubble", DataBubble, LayoutBubble);

    var bar_data =[
        {
        y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"

        }
    ];

    var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", bar_data, barLayout);
    });
}

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
    }

function optionChanged(newSample) {
     // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
    }
// bonus: gauge
var wfreqDefault = demoDefault.wfreq;
var gaugeData = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: wfreqDefault,
    title: {text: '<b>Belly Button Washing Frequency</b> <br> Scrubs per week'},
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [null, 9] },
      steps: [
        { range: [0, 1], color: 'rgb(248, 243, 236)' },
        { range: [1, 2], color: 'rgb(244, 241, 229)' },
        { range: [2, 3], color: 'rgb(233, 230, 202)' },
        { range: [3, 4], color: 'rgb(229, 231, 179)' },
        { range: [4, 5], color: 'rgb(213, 228, 157)' },
        { range: [5, 6], color: 'rgb(183, 204, 146)' },
        { range: [6, 7], color: 'rgb(140, 191, 136)' },
        { range: [7, 8], color: 'rgb(138, 187, 143)' },
        { range: [8, 9], color: 'rgb(133, 180, 138)' },
      ],
    }
  }
];

var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

Plotly.newPlot('gauge', gaugeData, gaugeLayout);
var wfreq = metainfo.wfreq;

Plotly.restyle('gauge', "value", wfreq);
      
    // Initialize the dashboard
    init();    

// bonus gauge

