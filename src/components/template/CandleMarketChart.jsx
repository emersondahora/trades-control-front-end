import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class CandleMarketChart extends Component {
  //class CandleStickChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        //chart: {
        defaultLocale: 'pt',
        // },
        title: {
          text: props.titulo || 'Candle Chart',
          align: 'left'
        },
        xaxis: {
          type: 'category'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        },
        chart: {
          events: {
            click: function (event, chartContext, config) {
              props.onSelectCandle(config.dataPointIndex);
            }
          }
        }
      },
    }
  }

  render() {
    let series = [{
      data: this.props.dados
    }]
    return (
        <ReactApexChart options={this.state.options} series={series} type="candlestick" height="300px" width="95%" />
    );
  }
}
export default CandleMarketChart;