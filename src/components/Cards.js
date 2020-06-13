import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
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
    render () {
        const { classes } = this.props;
        const listOfExpenses = [
            {
                name: 'Capital Expendatures',
            definition: 'Capital expenditures are the amounts spent for tangible assets that will be used for more than one year in the operations of a business.',
            },
            {
                name: 'Agency Expenditures',
                definition: 'Annual spending for personal services and other than personal services(OTPS) within each city agency.'
            },
            {
                name: 'Expense Actuals',
                definition: 'How much money an account has paid out in expenditures at a given point in time during a fiscal year.'
            },

        ];
        return (
            <div class="rows">
                {
                    listOfExpenses.map(currentExpense => {
                        return (
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                    {currentExpense.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    {currentExpense.definition}
                                    </Typography>
                                </CardContent>
                                <CardActions class="title" >
                                    <Button size="small">Show Graph</Button>
                                </CardActions>
                            </Card>
                        );
                    })}       
            </div>
        );
    }
  }

Cards.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles)(Cards);