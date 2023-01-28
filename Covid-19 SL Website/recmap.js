// Load GeoChart Package

google.charts.load("current", {
    "packages":["geochart"],
    // mapsApiKey 
    "mapsApiKey": "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"

    });
console.log("loading the map");
// Map Visualization 

google.charts.setOnLoadCallback(drawRegionsMap);

var fetched_data  = [
    ["Country", "Recovered"], ["", 0],
]

fetch("https://disease.sh/v3/covid-19/countries")
.then(response => response.json())
    .then(function(data) 
    {
        for (var country = 0; country < data.length; country ++)
        {

        if (data[country]["country"] == "USA")
        {

        fetched_data.push(["US", data[country]["recovered"]])
        }

        else if (data[country]["country"] == "UK")
        fetched_data.push(["United Kingdom", data[country]["recovered"]])

        else if (data[country]["country"] == "Libyan Arab Jamahiriya")
        fetched_data.push(["Libya", data[country]["recovered"]])

         else if (data[country]["country"] == "Syrian Arab Republic")
        fetched_data.push(["Syria", data[country]["recovered"]])

        else if (data[country]["country"] == "UAE")
        fetched_data.push(["United Arab Emirates", data[country]["recovered"]])

        else if (data[country]["country"] == "Lao People's Democratic Republic")
        fetched_data.push(["Laos", data[country]["recovered"]])

        else if (data[country]["country"] == "Czechia")
        fetched_data.push(["Czech Republic", data[country]["recovered"]])

        else if (data[country]["country"] == "Bosnia")
        fetched_data.push(["Bosnia and Herzegovina", data[country]["recovered"]])

        else if (data[country]["country"] == "Côte d'Ivoire")
        fetched_data.push(["Ivory Coast", data[country]["recovered"]])

        else if (data[country]["country"] == "S. Korea")
        fetched_data.push(["South Korea", data[country]["recovered"]])

        else if (data[country]["country"] == "Macedonia")
        fetched_data.push(["Macedonia", data[country]["recovered"]])

        else if (data[country]["country"] == "South Sudan")
        fetched_data.push(["South Sudan", data[country]["recovered"]])

        else if (data[country]["country"] == "Brazzaville")
        fetched_data.push(["Brazzaville", data[country]["recovered"]])

        else if (data[country]["country"] == "Svalbard")
        fetched_data.push(["Svalbard", data[country]["recovered"]])

        else if (data[country]["country"] == "Falkland Islands (Malvinas)")
        fetched_data.push(["Falkland Islands", data[country]["recovered"]])

        else if (data[country]["country"] == "N. Korea")
        fetched_data.push(["North Korea", data[country]["recovered"]])
         
        else
            fetched_data.push([ data[country]["country"], data[country]["recovered"]])
           
            
        }
        console.log(data);

        })   

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(fetched_data);

    var options = {
        colorAxis: {colors: ["#32CD32", "#90EE90", "#98FB98"]},
        backgroundColor: "transparent",
        datalessRegionColor: "#777",
        defaultColor: "#f5f5f5",
        tooltip: {isHtml: true}
    };

    var chart = new google.visualization.GeoChart(document.getElementById("regions"));
    chart.draw(data, options);
}

