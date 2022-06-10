// Submit Button handler
function handleSubmit() {
    // @TODO: YOUR CODE HERE

    // Select the input value from the form
    let city = d3.select("#cityInput").property("value");
    let city2 = d3.select("#cityInput2").property("value");
    let unit = d3.select("#unitInput").property("value");

    if ((city == "") || (city2 == "")) {
        alert("Please enter TWO cities!");
    } else {
        buildPlot(city, city2, unit);
    }

    // clear the input value

}


function buildPlot(city, city2, unit) {
    var apiKey = "03e9e164f471c95a8e22fde84f8539bb";

    // nested request
    let url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city2}&appid=${apiKey}&units=${unit}`;

    d3.json(url1).then(function(data1) {
        d3.json(url2).then(function(data2) {
            // wait for both requests to finish
            console.log(data1);
            console.log(data2);

            // extract both data sets
            var times1 = data1.list.map(x => x.dt_txt);
            var temps1 = data1.list.map(x => x.main.temp);

            var trace1 = {
                type: "scatter",
                mode: "lines",
                x: times1,
                y: temps1,
                line: {
                    color: "#17BECF",
                },
                name: city
            };

            var times2 = data2.list.map(x => x.dt_txt);
            var temps2 = data2.list.map(x => x.main.temp);

            var trace2 = {
                type: "scatter",
                mode: "lines",
                x: times2,
                y: temps2,
                line: {
                    color: "firebrick",
                },
                name: city2
            };

            // build plots
            var plotData = [trace1, trace2];

            var layout = {
                title: `${data1.city.name} & ${data2.city.name} 5-day forecast`,
            };

            Plotly.newPlot("plot", plotData, layout);
        });

    });
}

// Add event listener for submit button
// @TODO: YOUR CODE HERE

// buildPlot("Dallas");

d3.select("#submit").on("click", function() {
    handleSubmit();
});