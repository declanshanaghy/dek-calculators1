import React from 'react'
import PropTypes from 'prop-types'
import {Panel, ControlLabel, FormControl} from 'react-bootstrap'

class CompoundInterest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amounts: [],
            initialInvestment: this.props.initialInvestment,
            contribAmt: this.props.contribAmt,
            returnRate: this.props.interestRate,
        };

        // this.calculate = this.calculate.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    calculate = (periods) => {
        let data = [];
        let amt = this.state.initialInvestment;

        console.log('calculating...initial is ' + amt);

        for (let i=0; i<periods; i++) {
            amt += (amt * (this.state.returnRate/100.0)) + this.state.contribAmt;
            data[i] = amt;
        }
        return data;
    };
    calculatePeriod = (lastEntry, period, moment, additionalContribution) => {
        let currentValue = lastEntry === null ? this.state.initialInvestment : lastEntry.y;
        //Calculate new value from acrued interest + contributions,
        let interest = currentValue * (this.state.returnRate/100.0);
        let value = currentValue + interest + this.state.contribAmt + additionalContribution;

        //Add a new amount to state
        return {
            x: moment.unix(),
            y: value,
        };
    };
    render() {
        return (
            <span>
                {/*<Panel.Heading>*/}
                    <Panel.Title componentClass="h2">{this.props.label}</Panel.Title>
                {/*</Panel.Heading>*/}
                {/*<Panel.Body>*/}
                    <ControlLabel>Initial Investment</ControlLabel>
                    <FormControl type="text" name="initialInvestment"
                                 value={this.state.initialInvestment}
                                 onChange={this.handleInputChange}/>
                    <ControlLabel>Recurring Contribution</ControlLabel>
                    <FormControl type="text" name="contribAmt"
                                 value={this.state.contribAmt}
                                 onChange={this.handleInputChange}/>
                    <ControlLabel>Return Rate</ControlLabel>
                    <FormControl type="text" name="interestRate"
                                 value={this.state.returnRate}
                                 onChange={this.handleInputChange}/>
                {/*</Panel.Body>*/}
            </span>
        );
    }
}
CompoundInterest.defaultProps = {
    initialInvestment: 20.0,
    contribAmt: 10.0,
    interestRate: 5.0,
    label: "Compound Interest Investment",
};
CompoundInterest.propTypes = {
    initialInvestment: PropTypes.number,
    contribAmt: PropTypes.number,
    interestRate: PropTypes.number,
};

export default CompoundInterest;