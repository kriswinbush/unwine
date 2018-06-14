import React, {Component} from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
//import BlogBlurb from '../pages/Blog/BlogBlurb';
import Socialbar from './SocialBar';

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor:"rgba(245,245,245, 1.0)",
        padding: "10px"
    },
    flex: {
        flex: 3
    },
    text: {
        color: "rgb(163,60,96, 1.0)",
    },
    contact: {
        height: "100%"
    }
}

class Footer extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={16} className={classes.root}>


                <Grid item xs={12} >

                    <Grid className={classes.contact} container spacing={0} align="center" alignItems="flex-end">
                        <Grid item xs={12}>
                            <Typography className={classes.text} variant="display1" gutterBottom align="center">
                                Contact Us
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="headline" gutterBottom align="center">unWine, Inc.</Typography>
                            <Typography variant="subheading" color="textSecondary" gutterBottom align="center">ccross@unwinelounge.com</Typography>
                            <Typography variant="subheading" color="textSecondary" gutterBottom align="center">951-443-8120</Typography>
                                
                            <Typography variant="body2" gutterBottom align="center">
                                23905 Clinton Keith Road<br/>
                                Suite 114-278<br/>
                                Wildomar, CA 92595<br/>
                            </Typography>
                        </Grid>

                        <Grid item xs={12}> 
                            <Socialbar />
                        </Grid>
                    </Grid>
                </Grid>
                    

                


            </Grid>
        )
    }
}

export default compose(
    withStyles(styles)
)(Footer);

/* 
//Recent blog posts in footer
<Grid item xs={12} md={5}>
                    <Typography className={classes.text} variant="display1" gutterBottom align="center">
                        Recent Posts
                    </Typography>
                    <BlogBlurb />
                </Grid>

*/