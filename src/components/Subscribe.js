import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import SignUp from './SignUp';

const styles = {
    root: {
      flexGrow: 1,
      backgroundColor:"rgba(163,60,96, 1.0)" //rgba(218,55,50, 1.0)
    }
};

export class Subscribe extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} md={6}> 
                    <Typography variant="display2" gutterBottom align="center">
                        unWine Lounge Event
                    </Typography>
                    <Typography variant="display1" gutterBottom align="center">
                        June 16th, 2018
                    </Typography>
                    <Typography variant="display1" gutterBottom align="center">
                        Wildomar, Ca.
                    </Typography>
                    <Typography variant="headline" gutterBottom align="center">
                        Unwine has more in store for you. 
                        Join our newsletter so we can keep you up to date.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}> 
                    <SignUp />
                </Grid>
            </Grid>
        )
    }
}

export default compose(
    withStyles(styles)
)(Subscribe);