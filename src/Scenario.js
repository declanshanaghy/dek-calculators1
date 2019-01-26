import React from 'react'
import { Button, ControlLabel, Form, FormControl, Grid, Panel, PanelGroup, Row, Col } from 'react-bootstrap';

import moment from 'moment'

import {CompoundInvestment} from './FinancialInstruments'
import ScenarioGraph from './ScenarioGraph'

class Scenario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series1: null,
            series2: null,
            allSeries: null,
            timeHorizonYrs: 1,
            extraContribution: 0,
        };
        this.compound1 = React.createRef();
    }

    getTimeHorizonPeriods = () => {return this.state.timeHorizonYrs * 12};

    calculatePeriods = () => {
        const compound1 = this.compound1.current;
        const periods = this.getTimeHorizonPeriods();
        let m = moment();

        let series1 = [];
        for (let i=0; i<periods; i++) {
            let lastEntry = (i===0) ? null : series1[i-1];
            let newM = m.clone();

            series1[i] = compound1.calculatePeriod(lastEntry, i, newM, this.state.extraContribution)

            m.add(1, 'months');
        }
        console.log("series1=");
        console.log(series1);
        this.setState({
            series1: series1,
        });
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <Form>
                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col md={3} lg={3}>
                            <PanelGroup id="scenario1">
                                <Panel>
                                    <Panel.Heading>
                                        <Panel.Title>General Settings</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <ControlLabel>Time Horizon (years)</ControlLabel>
                                        <FormControl type="text" bsSize="small" placeholder="How long can you go?"
                                                     name="timeHorizonYrs" value={this.state.timeHorizonYrs}
                                                     onChange={this.handleInputChange}/>
                                        <label>Extra Contribution</label>
                                        <FormControl type="text" bsSize="small" placeholder="Extra monthly contribution amount"
                                                     name="extraContribution" value={this.state.extraContribution}
                                                     onChange={this.handleInputChange}/>
                                    </Panel.Body>
                                </Panel>
                                <CompoundInvestment ref={this.compound1} interestRate={10.0} id={2}
                                                    label="Investment 1"/>
                                <Panel>
                                    <Panel.Footer>
                                        <Button bsClass="btn-success" onClick={this.calculatePeriods}>Calculate</Button>
                                    </Panel.Footer>
                                </Panel>
                            </PanelGroup>
                            <div>
                            </div>
                        </Col>
                        <Col md={9} lg={9}>
                            <ScenarioGraph allSeries={[this.state.series1]}/>
                        </Col>
                    </Row>
                </Grid>
            </Form>
        );
    }
}

export default Scenario;