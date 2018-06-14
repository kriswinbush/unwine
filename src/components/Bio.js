import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
      padding: "20px",
      flexGrow: 1,
      gridColumnStart: "2",
      gridColumnEnd: "4",
      gridRowStart: "2",
      gridRowEnd: "3",
      backgroundColor:"rgba(163,60,96, 1.0)"
    }
};

class Bio extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="display2" gutterBottom>
                    Welcome to unwine
                </Typography>
                <Typography variant="headline" gutterBottom>
                    Have you ever gone to a small, 
                    cozy lounge that serves wine, 
                    beer and light appetizers, 
                    and said “I wish I had something like this near me.”? 
                    Well so have I. 
                    Wine Bar Coming Soon! 
                    Join me as I journey through wine and food pairings. 
                    Come drink, taste and give your feedback. 
                    I’d like to know what you want to see on the menu.
                </Typography>
            </div>
        )
    }
}

export default withStyles(styles)(Bio);