import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const styles = {
    root: {
        flexGrow: 1,
        backgroundImage: "url('/assets/images/wine_pour.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    },
    text: {
        color: "rgba(255,255,255, 0.9)"
    }
}
class Invited extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={0} justify="center" className={classes.root}>
                <Grid item xs={11}>
                    <Hidden smDown>
                        <Typography className={classes.text} variant="display4" gutterBottom>
                            <i>You're welcome to come unWine, with us.</i>
                        </Typography>
                    </Hidden>
                    <Hidden mdUp>
                        <Typography className={classes.text} variant="display3" gutterBottom>
                            <i>You're welcome to come unWine, with us.</i>
                        </Typography>
                    </Hidden>
                </Grid>    
            </Grid>
        )
    }
}

export default withStyles(styles)(Invited)