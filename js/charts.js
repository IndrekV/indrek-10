/* Flot charts */

$(function() {

  var goalData = [];
  for (var i = 95.5; i > 85; i -= 0.5) {
    goalData.push([goalData.length,i]);
  }

  var realData = [];
  realData = goalData;
    console.log(goalData);
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

});