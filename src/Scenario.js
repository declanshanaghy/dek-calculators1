import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

export class ScenarioGraph extends React.Component {
    render() {
        return (
            <div>
                <VictoryChart
                    domainPadding={10}
                    theme={VictoryTheme.material}>
                    <VictoryAxis
                        tickValues={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}/>
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`$${x / 1000}k`)}/>
                    <VictoryStack colorScale={"warm"}>
                        <VictoryLine
                            data={data2012}
                            x={"quarter"}
                            y={"earnings"}
                        />
                    </VictoryStack>
                </VictoryChart>
            </div>
        );
    }
}