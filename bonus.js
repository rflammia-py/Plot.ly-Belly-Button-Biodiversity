

var ColorsG = ["#4D8C57", "#78A161", "#A3B56B","#C3D323", "#CDCA74","#F8DE7E", "#E9C9AE", "#FFDEA6", "#F9E9DA", "white"];



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
  
  //=============Gauge Chart Function=======================//
  
  function buildGaugeChart(sample) {
    console.log("sample", sample);
  
    d3.json("samples.json").then(data =>{
  
      var objs = data.metadata;

  
      var matchedSampleObj = objs.filter(sampleData => 
        sampleData["id"] === parseInt(sample));
      
  
      gaugeChart(matchedSampleObj[0]);
   });   
  }
  
  
  //=============== Build a GAUGE Chart ==================//

  function gaugeChart(data) {
    console.log("gaugeChart", data);
  
    if(data.wfreq === null){
      data.wfreq = 0;
  
    }
  
    let degree = parseInt(data.wfreq) * (180/10);
  

    let degrees = 180 - degree;
    let radius = .5;
    let radians = degrees * Math.PI / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);
  
    let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    let path = mainPath.concat(pathX, space, pathY, pathEnd);
    
    let trace = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 50, color:'2F6497'},
        showlegend: false,
        name: 'WASH FREQ',
        text: data.wfreq,
        hoverinfo: 'text+name'},
      { values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
      textinfo: 'text',
      textposition:'inside',
      textfont:{
        size : 16,
        },
      marker: {colors:[...ColorsG]},
      labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],
      hoverinfo: 'text',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];
  
    let layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '#2F6497',
          line: {
            color: '#2F6497'
          }
        }],
  
      title: '<b>Belly Button Washing Frequency</b> <br> <b>Scrub Per Week</b>',
      height: 550,
      width: 550,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
    };
  
    Plotly.newPlot('gauge', trace, layout, {responsive: true});
  
  }
  
  

  
  function init() {
 
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
 
    const firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts(firstSample);
    buildGaugeChart(firstSample)
    
  
  
  });
  }
  
  function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  buildGaugeChart(newSample)
  
  }
  
  
  
  // Initialize the dashboard
  init();