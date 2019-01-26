import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import {Panel} from 'react-bootstrap';
import moment from 'moment'

class ScenarioGraph extends React.Component {
    constructor(props) {
        super(props);
        this.stack = React.createRef()
    }

    render() {
        let mainContent;

        if ( this.props.allSeries[0] === null || this.props.allSeries[0].length === 0 ) {
            mainContent = <span>Waiting for data</span>
        } else {
            let lastXTick = null;
            mainContent =
                <VictoryChart
                    width="1000"
                    height="750"
                    // animate={true}
                    domainPadding={10}
                    theme={VictoryTheme.material}>
                    <VictoryAxis
                        tickFormat={(x) => {
                            let t = null;
                            let m = moment.unix(x);
                            if ( lastXTick === null || lastXTick.year !== x.year ) {
                                t = m.format("MMM YYYY").replace(" ", "\n");
                            } else {
                                t = m.format("MMM");
                            }
                            lastXTick = x;
                            return t;
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={y => "$" + y}
                    />
                    <VictoryStack colorScale={"warm"}>
                        {
                            this.props.allSeries.map((series) => {
                                return (
                                    <VictoryLine
                                        key={series}
                                        data={series}/>
                                )
                            })
                        }
                    </VictoryStack>
                </VictoryChart>
        }
        return (
            <Panel bsStyle="warning">
                <Panel.Heading>
                    <Panel.Title>{this.props.label}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {mainContent}
                </Panel.Body>
            </Panel>
        );
    }
}
ScenarioGraph.defaultProps = {
    label: "Your Scenario",
};

export default ScenarioGraph;