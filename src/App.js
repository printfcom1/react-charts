import React from 'react';
import './App.css';
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [
        {
          label: "Group 1",
          value: "10"
        },
        {
          label: "Group 2",
          value: "20"
        },
        {
          label: "Group 3",
          value: "30"
        },
        {
          label: "Group 4",
          value: "40"
        },
        {
          label: "Group 5",
          value: "50"
        },
        {
          label: "Group 6",
          value: "60"
        },
        {
          label: "Group 7",
          value: "70"
        },
        {
          label: "Group 8",
          value: "80"
        },
        {
          label: "Group 9",
          value: "90"
        },
        {
          label: "Group 10",
          value: "100"
        }
      ]
    };
  }

  componentDidMount() {
    // Set interval to update chart data every 1 second
    this.interval = setInterval(() => {
      // Generate new chart data
      const newData = this.state.chartData.map(group => {
        return { label: group.label, value: Math.floor(Math.random() * 100) };
      });

      newData.sort((a, b) => b.value - a.value);
      // Update state with new chart data
      this.setState({ chartData: newData });
    }, 1000);
  }

  componentWillUnmount() {
    // Clear interval when component unmounts to prevent memory leaks
    clearInterval(this.interval);
  }

  render() {
    const chartConfigs = {
      type: "bar2d",
      width: "1500",
      height: "800",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Groups",
          xAxisName: "Group",
          yAxisName: "Value",
          theme: "fusion",
          //inverseYAxis: true, 
        },
        data: this.state.chartData,
      }
    };

    return <ReactFC {...chartConfigs} />;
  }
}

export default App;
