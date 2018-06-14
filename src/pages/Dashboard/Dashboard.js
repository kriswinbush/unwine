import React, { Component } from 'react';
import './dashboard.css';
import compose from 'recompose/compose';
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SendEmail from './SendEmail';
//import SendNotification from './SendNotification';
//import AddBlogPost from './AddBlogPost';

import Grid from '@material-ui/core/Grid';
const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: theme.spacing.unit * 8
    }
});

class Dashboard extends Component {
    state = { value: 0 };
    handleChange = (event, value) => this.setState({ value });
  
    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <Grid 
                container
                direction="column" 
                spacing={0} 
                className={classes.root}
            >
                <Grid item xs={12}>
                    <Typography variant="display3" gutterBottom>
                        Dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label="Send e-mail" />
                            {/* <Tab label="Send Notification" />
                                <Tab label="Add Blog Post" /> */}
                        </Tabs>
                    </AppBar>
                </Grid>
                <Grid item xs={12}>
                    {value === 0 && <SendEmail />}
                    { /* {value === 1 && <SendNotification />}
                        {value === 2 && <AddBlogPost />} */ }
                </Grid>
            </Grid> 
        )
    }
}

function mapStateToProps(state) {
    return {
        subscribers: state.firebase.data['subscribers']
    }
}

export default compose(
    firebaseConnect([
        'subscribers'
    ]),
    connect(mapStateToProps),
    withStyles(styles)
)(Dashboard);