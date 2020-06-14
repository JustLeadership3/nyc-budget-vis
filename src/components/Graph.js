import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryLegend,
  VictoryLabel,
} from 'victory';

class Graph extends Component {
  render() {
    let legendData = [];

    const returnedArray = this.props.currentDataSet;

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    let displayName = ""

    if (this.props.currentDataSetName === 'capitalExp') {
      displayName = "Capital Expenditures"
    } else if (this.props.currentDataSetName === 'agencyExp') {
      displayName = "Agency Expenditures"
    } else if (this.props.currentDataSetName === 'expenseActuals') {
      displayName = "Expense Actuals"
    }

    console.log(this.props.currentDataSetName)
    return (
      <div id={'graph-container'}>
        <VictoryChart
        id="victory-chart"
          scale="linear"
          theme={VictoryTheme.material}
          padding={{left: 100, bottom: 50, right: 100, top: 100}}
          style={{parent: { maxwidth: 1000}}}
          width={1000} // aspect ratio to stretch graph horizontally
        >
          <VictoryLabel
          id="chart-title"
          text={displayName}
          style={{fontSize: "20px"}}
          dy={30}
          dx={30}
          textAnchor="start"/>

          {returnedArray.map((currentDept) => {
            let color = getRandomColor();
            legendData.push({
              name: currentDept.agency,
              symbol: { fill: color },
            });
            return (
              <VictoryLine
                key={currentDept.agency}
                style={{
                  data: { stroke: color },
                  parent: { border: '1px solid #ccc' },
                }}
                data={currentDept.data}
              />
            );
          })}
        </VictoryChart>
        <VictoryLegend  
          gutter={20}
          itemsPerRow={30}
          data={legendData}
          width={1000} // aspect ratio to make the legend a good size relative to the chart
        />
      </div>
    );
  }
}

export default Graph;
