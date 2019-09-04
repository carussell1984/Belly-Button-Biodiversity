function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`
  console.log(url)
  d3.json(url).then(function(response) {
    var data = [response];
    
    console.log(data)
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    panel.html("")
    
    // Use `Object.entries` to add each key and value pair to the panel
    

    Object.entries(data[0]).forEach(([key, value]) => {
      panel.append("p").attr("class", "card-text").text(`${key}: ${value}`);
      console.log(`this key ${key}: this value ${value}`);
      });
     
    });
  }
    
    
  function buildGauge(sample) {
    var url = `/metadata/${sample}`
    console.log(url)
    d3.json(url).then(function(response) {
      var data = [response];
      var washings = data[0].WFREQ;

      console.log(data)
      console.log(washings)

    var gaugetrace = [{domain: {x: [0, 1], y: [0, 1]}, 
                      value: washings, 
                      title: {text: "Washings per Week"},
                      type: "indicator", mode: "gauge+number", 
                      gauge: {axis: {range: [null, 9]}, 
                                  bar:{color:"black"},
                  steps: [{range: [0, 1], color: "#9fdfbf"},
                          {range: [1, 2], color: "#79d2a6"},
                          {range: [2, 3], color: "#66cc99"},
                          {range: [3, 4], color: "#53c68c"},
                          {range: [4, 5], color: "#40bf80"},
                          {range: [5, 6], color: "#39ac73"},
                          {range: [6, 7], color: "#39ac73"},
                          {range: [7, 8], color: "#339966"},
                          {range: [8, 9], color: "#2d8659"}]}}];


    var layouttrace = {width: 500, height: 500, margin: {t: 0, b: 0}};

  
    Plotly.newPlot("gauge", gaugetrace, layouttrace);

});

}



function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`
  d3.json(url).then(function(response) {
    var chartData = [response];
    console.log('chartData')
    console.log(chartData)
    // @TODO: Build a Bubble Chart using the sample data
    console.log(chartData[0].otu_ids)

    console.log("ids") 
    color_array = []
    var ids = chartData[0].otu_ids
    Object.entries(ids).forEach(([i, j]) => {
      console.log(i, j)
      if (j < 500) {
        color_array.push("rgb(143, 188, 143)")
      } else if (j < 1000) {
        color_array.push("rgb(95, 158, 160)")
      } else if (j < 1500) {
        color_array.push("rgb(72, 61, 139)")
      } else if (j < 2000) {
        color_array.push("rgb(153, 50, 204)")
      }  else if (j <2500 ) {
         color_array.push("rgb(240, 128, 128)")
      }  else {
        color_array.push("rgb(178, 34, 34)")
      };
      });
    
    console.log(color_array)

    var bubbledata = {
      x: chartData[0].otu_ids,
      y: chartData[0].sample_values,
      text: chartData[0].otu_labels,
      mode: 'markers',
      marker: {
        color: color_array,
        size: chartData[0].sample_values
      }
    };
    
  
    var layout = {
      title: "Belly Button Bacteria",
      xaxis: { title: "Bacteria ID"},
      yaxis: { title: "Volume of Bacteria"},
      showlegend: false,
     };

    var bubbledata_1 = [bubbledata];
   
    
    Plotly.newPlot('bubble', bubbledata_1, layout);

    

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var piedata = [response];
    console.log("piedata");
    console.log(piedata);

    piedata.sort(function(a, b) {
      return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });
    console.log("aftersort");
    console.log(piedata);
    var values = piedata[0].sample_values.slice(0, 10);
    var labels = piedata[0].otu_labels.slice(0, 10); 
    var ids = piedata[0].otu_ids.slice(0, 10);
    
    

    console.log(values);
    console.log(labels);
    console.log(ids);
    //build pie chart
    var data = [{
      values: values,
      labels: ids,
      type: 'pie'
    }];
    
    var layout = {
      title: "Top Belly Button Bacteria Types",
    };
    
    Plotly.newPlot('pie', data, layout);
     
  });
  };
  

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
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
    buildGauge(firstSample);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  buildGauge(newSample);
};

// Initialize the dashboard
init();
