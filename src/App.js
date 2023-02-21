import React  from 'react';
import './App.css';
import ReactFC from "react-fusioncharts";
import moment from 'moment';
//var request = require('request');
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

    this.state = {};
  }
  
  async fetchData() {
    const dateNow = this.state.dateNow
    console.log(dateNow)
    const i = this.state.i;
    const data = this.state.data
    const filteredData = data.filter(entry => entry.date === dateNow);
    //console.log(data)
    const newData = filteredData.map(group => {
      return { label: group.state, value: group.cases };
    });
    newData.sort((a, b) => b.value - a.value);
    const nextI = i >= 30 ? 1 : i + 1;
    const yesterday = moment().subtract(i, 'days').format('YYYY-MM-DD');
    this.setState({ chartData: newData, i: nextI,dateNow : yesterday });
  }

  async componentDidMount() {
    // Set interval to update chart data every 1 second
    const dateNow = moment().format('YYYY-MM-DD');
    const data = await getDataFromAPI(30);
    this.setState({ i: 1 ,data:data,dateNow:dateNow});
    this.interval = setInterval(() => {
      this.fetchData();
    }, 2000);
  }

  componentWillUnmount() {
    // Clear interval when component unmounts to prevent memory leaks
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.chartData !== this.state.chartData) {
      const chartConfigs = {
        type: "bar2d",
        width: "1800",
        height: "1400",
        dataFormat: "json",
        dataSource: {
          chart: {
            caption: "Groups",
            xAxisName: "Group",
            yAxisName: "Value",
            //theme: "fusion",
          },
          data: this.state.chartData,
        }
      };
      this.setState({ chartConfigs: chartConfigs });
    }
  }

  render() {
    return <ReactFC {...this.state.chartConfigs} />;
  }
}


export default App;



async function getDataFromAPI(day) {
  const response = await fetch(`https://disease.sh/v3/covid-19/nyt/states?lastdays=${day}`);
  const data = await response.json();
  return data;
}