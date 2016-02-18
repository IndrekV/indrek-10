/* Flot charts */

var monthNames = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "June", "July",
  "Aug", "Sep", "Oct",
  "Nov", "Dec"
],
  date = new Date(),
  realData = [],
  bw_file = "FitNotes_BodyWeight_Export_2016_02_14_09_53_31.csv";

Date.prototype.addDays = function(days)
{
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

function getDateString(d) {
  var day = d.getDate(),
  monthIndex = d.getMonth(),
  year = d.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function drawWeightChart() {
  var chart = $("#chart-weight"),
    goalData = [],
    timeTicks = [];

  for (var i = 95.5; i > 85; i -= 0.5) {
    goalData.push([date.getTime(), i]);
    timeTicks.push(date.getTime());
    date = date.addDays(7);
  }

  var data = [
    {
      data: goalData,
      label: "Goal",
      dashes: {show: true}
    },
    {
      data: realData,
      label: "Real",
      dashes: {show: true}
    }
  ];

  var options = {
    series: {
      lines: {
        show: true,
        fill: false, 
      },
      points: {
        show: false
      },
      shadowSize: 0,
      stack: true
    },
    grid: {
      hoverable: true, 
      tickColor: "#f9f9f9",
      borderWidth: 0
    },
    legend: {
      show: false,
      backgroundOpacity: 0,
      labelBoxBorderColor: "#fff"
    },  
    colors: ['#954747','#999747','#549547','#549547','#477295','#477295'],
    xaxis: {
      mode: "time",
      timeformat: "%d %b %Y",
      monthNames: monthNames,
      ticks: timeTicks,
      minTicks: [1, "month"],
      font: {
        family: "Roboto,sans-serif",
        color: "#ccc"
      },
      tickFormatter: function (val, axis) {
        return getDateString(new Date(val));
      }
    },
    yaxis: {
      ticks: 10,
      min: 80,
      max: 100,
      tickDecimals: 0,
      font: {color: "#ccc"}
    }
  };

  $.plot(chart, data, options);
  /*chart.find('.legend table').css('width', 'auto')
         .find('td').css('padding', 5);
         */

}

$(function() {
  $.get("js/data/" + bw_file, function( data ) {
    var arr = data.split("\n"),
      row;
    for (var i = 1; i < arr.length; i++) {
      row = arr[i].split(",");
      realData.push([new Date(row[0]).getTime(), parseInt(row[2], 10)]);
    }
    drawWeightChart();
  });
  
/*
  $.plot("#chart-weight", [
    { label: "Goal", data: goalData },
    { label: "Real", data:  realData}
  ], {
    series: {
      lines: { show: true },
      steps: { show: true }
    },
    hoverable: true,
    xaxis: {
      ticks: [
        "Feb 1",
        "Feb 8",
        "Feb 15",
        "Feb 22",
        "Feb 29",
        "Mar 7",
        "Mar 14",
        "Mar 21",
        "Mar 28"
      ]
    },
    yaxis: {
      ticks: 10,
      min: 80,
      max: 100,
      tickDecimals: 1
    },
    grid: {
      backgroundColor: { colors: [ "#fff", "#eee" ] },
      borderWidth: {
        top: 1,
        right: 1,
        bottom: 2,
        left: 2
      }
    }
  });
*/

});

