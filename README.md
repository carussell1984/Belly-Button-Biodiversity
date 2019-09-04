# Belly-Button-Biodiversity
For this project, an interactive dashboard to explore the Belly Button Biodiversity DataSet at http://robdunnlab.com/projects/belly-button-biodiversity/ was created. 

The following Steps were taking to create the dash board:

<strong> Step 1: Plotly.js </strong>
1. Create a PIE chart that uses data from your samples route "/samples/<sample>" to display the top 10 samples
  * The sample_values are the values, the otu_ids are te labels, and the otu_labels are the hovertext for the chart.
  
2. Create a Bubble Chart that uses data from your sample route  "/samples/<sample>" to display each sample
   * Use uto_ids for the x values
   * Use sample_values for the y values
   * Use sample_values for the marker size
   * Use otu_ids for the marker colors
   * Use otu_labels for the text values
  
3. Display the sample metadata from the route: "/metasample/<sample>"
   * Display each key/value pair from the metadata JSON object
  
4. Update all the plots anytime that a new sample is selected

5. Optional - create a gauge chart that will display that number of washings per week from the "/metasample/<sample>" route

<strong> Step 2: Heroku </strong>
1. Deploy your Flask app to Heroku
  
