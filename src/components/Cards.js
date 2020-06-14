import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getCapitalExp, getAgencyExp, getExpenseActuals } from '../store';
import { connect } from 'react-redux';

const useStyles = (theme) => ({
  root: {
    minWidth: 100,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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
      <div className="card-container">
        {listOfExpenses.map((currentExpense, index) => {
          return (
            <Card
              className={`${classes.root}} card`}
              variant="outlined"
              key={currentExpense.name}
            >
              <CardContent >
                <p className="card-title">
                  {currentExpense.name}
                  </p>
                  <p className="card-descrition">
                  {currentExpense.definition}
                  </p>
              </CardContent>
                <Button
                  id="button"
                  onClick={() => {
                    this.props.getData(currentExpense.name);
                  }}
                >
                  Show Graph
                </Button>
            </Card>
          );
        })}
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

export default connect(null, mapDispatch)(withStyles(useStyles)(Cards));
