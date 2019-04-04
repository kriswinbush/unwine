import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Subscribe from '../../components/Subscribe';
import Footer from '../../components/Footer';
import Heading from '../../components/Heading';
import Invited from '../../components/Invited';
import Grid from '@material-ui/core/Grid';
import BlogBlurb from '../Blog/BlogBlurb';

const styles = {
    root: {
        flexGrow: 1,
        marginTop:"64px"
    }
};

class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="center" className={classes.root} spacing={0}>
                <Grid item xs={12}>
                    <Heading />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* <Invited /> */}
                    <BlogBlurb />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Subscribe />
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Home);

