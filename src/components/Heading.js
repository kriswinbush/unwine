import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        height:"100vh",
        width: "100%",
        backgroundColor:"rgba(255,255,255, 1.0)"
    },
    image: {
        height: "auto",
        width: "100%"
    }
}
class Heading extends Component {
    render() {
        const { classes } = this.props;
        return (
                <Grid 
                    container
                    spacing={0} 
                    className={classes.root}
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={11}>
                        <img className={classes.image} src="/assets/images/unwine_logo_mask.png" alt="unwine logo" />        
                    </Grid>
                </Grid>
        )
    }
}

export default withStyles(styles)(Heading);