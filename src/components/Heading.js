import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        height:"100vh",
        width: "100%",
        backgroundColor:"rgba(255,255,255, 1.0)",
        backgroundImage:"url(/assets/images/code.png)"
    },
    flexContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        
    },
    flexInset: {
        flex: 0
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
                        <div className={classes.flexContainer}>
                            <div className={classes.flexInset} >
                                <img src="/assets/images/rgb-pdi-logo.svg" alt="Painted Dog Logo" />
                            </div>
                        </div>       
                    </Grid>
                </Grid>
        )
    }
}

export default withStyles(styles)(Heading);