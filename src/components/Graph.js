import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import think creator here;
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLegend, VictoryLabel } from 'victory';


class Graph extends Component {
  render () {

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

      function findLowestXHighestY(data) {
        let y = -Infinity;
        let x = Infinity;
    
        for (let i = 0; i < data.length; i++) {
            let currElem = data[i];
            for (let k = 0; k < currElem.data.length; k++) {
                let currXAndY = currElem.data[k];
                if (currXAndY.x < x) {
                    x = currXAndY.x;
                }
                if (currXAndY.y > y) {
                    y = currXAndY.y
                }
            }
        }
    
            return {y, x};
        }

    const LowestXhighestY = findLowestXHighestY(returnedArray);

    return (
        <div id={"graph-container"}>
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{x: [LowestXhighestY.x, 2019], y: [0, LowestXhighestY.y]}}
                
            >
                <VictoryLabel text="Chart Title" x={225} y={30} textAnchor="middle"/>

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

            {
                returnedArray.map((currentDept) => {
                    return (
                    <VictoryLine
                    key={currentDept.agency}
                    style={{
                        data: { stroke: "#C43A31" },
                        parent: { border: "1px solid #ccc"}
                    }}
                    data={ currentDept.data }
                    />
                )})}
            </VictoryChart>
            <VictoryLegend       
                gutter={20}
                itemsPerRow={5}
                data={[
                    {name: 'One', symbol: {fill: "tomato", type: "star"}},
                    {name: 'Two', symbol: {fill: "orange"}},
                    {name: 'Three', symbol: {fill: "gold"}},
                    {name: 'Three', symbol: {fill: "gold"}},

                ]}
            />
      </div>
    );
  }
}

export default Graph;