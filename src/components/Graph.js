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
    console.log('Graph Data:', returnedArray);

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    return (
      <div id={'graph-container'}>
        <VictoryChart
          scale="linear"
          theme={VictoryTheme.material}
          padding={{ left: 100, bottom: 100, right: 100 }}
        >
          <VictoryLabel text="Chart Title" x={225} y={30} textAnchor="middle" />

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
        <VictoryLegend gutter={20} itemsPerRow={5} data={legendData} />
      </div>
    );
  }
}

export default Graph;
