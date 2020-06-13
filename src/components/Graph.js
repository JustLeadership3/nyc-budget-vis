import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import think creator here;
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLegend } from 'victory';


class Graph extends Component {
  render () {
    return (
        <VictoryChart
        theme={VictoryTheme.material}
        domain={{x: [1, 5], y: [0, 14]}}
      >
        <VictoryLegend x={125} y={50}
            orientation='horizontal'
            gutter={20}
            style={{boarder: {stroke: 'black'}, title: {fontSize: 20}}}
            data={[
                {name: 'One', symbol: {fill: "tomato", type: "star"}},
                {name: 'Two', symbol: {fill: "orange"}},
                {name: 'Three', symbol: {fill: "gold"}}
            ]}
        />
        
        <VictoryLine
          style={{
            data: { stroke: "#000" },
            parent: { border: "1px solid #ccc"}
          }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
        <VictoryLine
          style={{
            data: { stroke: "#C43A31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={[
            { x: 1, y: 5 },
            { x: 2, y: 6 },
            { x: 3, y: 8 },
            { x: 4, y: 9 },
            { x: 5, y: 5 }
          ]}
        />
      </VictoryChart>
    );
  }
}

export default Graph;