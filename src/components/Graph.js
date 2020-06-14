import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import think creator here;
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLegend, VictoryLabel } from 'victory';


class Graph extends Component {
  render () {
    let legendData = [];

    const returnedArray = [
        { agency: "NYPD",
        data: [
          {x: 2015,
          y: 500000},
          {x: 2016,
          y: 500000},
          {x: 2017,
          y: 500000},
        ]}, 
        { agency: "Education",
        data: [
          {x: 2015,
          y: 400000},
          {x: 2016,
          y: 1600000},
          {x: 2017,
          y: 200000},
        ]}
      ];

      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    return (
        <div id={"graph-container"}>
            <VictoryChart
                scale="linear"
                theme={VictoryTheme.material}
            >
                <VictoryLabel text="Chart Title" x={225} y={30} textAnchor="middle"/>

            {
                returnedArray.map((currentDept) => {
                    let color = getRandomColor();
                    legendData.push({name: currentDept.agency, symbol: {fill: color}})
                    return (
                    <VictoryLine
                    key={currentDept.agency}
                    style={{
                        data: { stroke: color},
                        parent: { border: "1px solid #ccc"}
                    }}
                    data={ currentDept.data }
                    />
                )})}
            </VictoryChart>
            <VictoryLegend       
                gutter={20}
                itemsPerRow={5}
                data={legendData}
            />
      </div>
    );
  }
}

export default Graph;