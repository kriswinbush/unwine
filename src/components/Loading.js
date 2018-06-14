import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

const styles = {
    root: {
        display: "flex",
        height:"100vh",
        width: "100%",
        backgroundColor:"rgba(255,255,255, 1.0)",
        position: "relative",
        zIndex: 9999
    },
    nest: {
        width: "75%"
    }
}

class Loading extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.root} >
                <div className={classes.nest} >
                    <CircularProgress mode="indeterminate" size={80} />
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Loading);