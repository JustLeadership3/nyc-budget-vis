import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { getCapitalExp, getAgencyExp, getExpenseActuals } from '../store';
import { connect } from 'react-redux';
import Graph from './Graph';
import './Cards.css';


class Cards extends Component {
  render() {
    const { classes } = this.props;
    const listOfExpenses = [
      {
        name: 'Capital Expenditures',
        definition:
          'Capital expenditures are the amounts spent for tangible assets that will be used for more than one year in the operations of a business.',
      },
      {
        name: 'Agency Expenditures',
        definition:
          'Annual spending for personal services and other than personal services (OTPS) within each city agency.',
      },
      {
        name: 'Expense Actuals',
        definition:
          'How much money an account has paid out in expenditures at a given point in time during a fiscal year.',
      },
    ];

    return (
      <div>
      <div id="card-container">
        {listOfExpenses.map((currentExpense) => {
          return (
            <div
              className="card"
            >
              <div className="card-text">
                <p className="card-title">
                  {currentExpense.name}
                  </p>
                  <p className="card-descrition">
                  {currentExpense.definition}
                  </p>
              </div>
              <Button
                id="button"
                onClick={() => {
                  this.props.getData(currentExpense.name);
                }}
              >
                Show Graph
              </Button>
            </div>
          );
        })}
      </div>
      <Graph currentDataSet={this.props.currentDataSet()} currentDataSetName={this.props.currentDataSetName}/>
      </div>
    );
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatch = (dispatch) => ({
  getData: (name) => {
    switch (name) {
      case 'Capital Expenditures':
        dispatch(getCapitalExp());
        return;
      case 'Agency Expenditures':
        dispatch(getAgencyExp());
        return;
      case 'Expense Actuals':
        dispatch(getExpenseActuals());
        return;
      default:
        return;
    }
  },
});

const mapState = (state) => ({
  currentDataSet: () => {
    if (state.currentDataSet === 'capitalExp') {
      return state.capitalExp
    } else if (state.currentDataSet === 'agencyExp') {
      return state.agencyExp
    } else if (state.currentDataSet === 'expenseActuals') {
      return state.expenseActuals;
    } else {
      return [];
    }
  },

  currentDataSetName: state.currentDataSet

})

export default connect(mapState, mapDispatch)(Cards);
