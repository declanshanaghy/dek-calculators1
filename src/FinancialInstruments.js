import React from 'react'
import PropTypes from 'prop-types'
import {Panel, ControlLabel, FormControl} from 'react-bootstrap'

class FinancialInstrument extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialValue: this.props.initialValue,
            payment: this.props.payment,
            interestRate: this.props.interestRate,
        };
    }

    handleInputChange = (e) => {
        let v = parseFloat(e.target.value);
        if ( isNaN(v) ) {
            v = e.target.value;
        }
        console.log(e.target.name + " = " + v);
        this.setState({
            [e.target.name]: v
        });
    };

    render() {
        return (
            <Panel id={"instrument-" + this.props.id}>
                <Panel.Heading>
                    <Panel.Title componentClass="h2" toggle>
                        {this.props.label}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <ControlLabel>{this.props.initialValueLabel}</ControlLabel>
                    <FormControl type="number" name="initialValue"
                                 value={this.state.initialValue}
                                 onChange={this.handleInputChange}/>
                    <ControlLabel>{this.props.paymentLabel}</ControlLabel>
                    <FormControl type="number" name="payment"
                                 value={this.state.payment}
                                 onChange={this.handleInputChange}/>
                    <ControlLabel>{this.props.interestRateLabel}</ControlLabel>
                    <FormControl type="number" name="interestRate"
                                 value={this.state.interestRate}
                                 onChange={this.handleInputChange}/>
                    {this.props.children}
                </Panel.Collapse>
            </Panel>
        );
    }
}
FinancialInstrument.defaultProps = {
    label: "Generic Financial Instrument",
    initialValue: 0.0,
    initialValueLabel: "Initial Vaue",
    payment: 0.0,
    paymentLabel: "Recurring Payment",
    interestRate: 0.0,
    interestRateLabel: "Interest Rate",
};
FinancialInstrument.propTypes = {
    initialValue: PropTypes.number,
    initialValueLabel: PropTypes.string,
    payment: PropTypes.number,
    paymentLabel: PropTypes.string,
    interestRate: PropTypes.number,
    interestRateLabel: PropTypes.string,
};


export class CompoundInvestment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aField: this.props.aField
        }
        this.instrument = React.createRef()
    }

    handleInputChange = (e) => {
        let v = parseFloat(e.target.value);
        if ( isNaN(v) ) {
            v = e.target.value;
        }
        console.log(e.target.name + " = " + v);
        this.setState({
            [e.target.name]: v
        });
    };

    calculatePeriod = (lastEntry, period, moment, additionalContribution) => {
        let instrument = this.instrument.current.state;
        let currentValue = lastEntry === null ? instrument.initialValue : lastEntry.y;

        //Calculate new value from acrued interest + contributions,
        let interest = currentValue * (instrument.interestRate/100.0);
        let value = currentValue + interest + instrument.payment + additionalContribution;

        //Add a new amount to state
        return {
            x: moment.unix(),
            y: value,
        };
    };

    render() {
        return (
            <FinancialInstrument ref={this.instrument}
                label={this.props.label}
                initialValue={this.props.initialValue}
                initialValueLabel={this.props.initialValueLabel}
                payment={this.props.payment}
                paymentLabel={this.props.paymentLabel}
                interestRate={this.props.interestRate}
                interestRateLabel={this.props.interestRateLabel}>
                <ControlLabel>Another field</ControlLabel>
                <FormControl type="text" name="aField"
                             value={this.state.aField}
                             onChange={this.handleInputChange}/>
            </FinancialInstrument>
        );
    }

}
CompoundInvestment.defaultProps = {
    label: "Compound Investment",
    initialValue: 20.0,
    initialValueLabel: "Initial Investment",
    payment: 10.0,
    paymentLabel: "Recurring Investment",
    interestRate: 5.0,
    interestRateLabel: "Return Rate",
    aField: "A FIELD",
};
