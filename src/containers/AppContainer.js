import React, { Component } from 'react';
import { BrowserRouter as Router, Route, /* Link, */ Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '../components/AppBar';
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login';
import Blog from '../pages/Blog/Blog';
import Gallery from '../pages/Gallery/Gallery';
import { userIsAdmin,userIsAuthed  } from '../services/UserHasPermission';
const styles = {
    root: {
      flexGrow: 1,
      height: "100%",
      overflowX: "hidden"
    }
  };

class AppContainer extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Router>
                <div className={classes.root}>
                    <AppBar />
                    <Switch>
                        <Route exact path="/"  component={/*Dashboard */Home} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/dashboard" component={ userIsAuthed(userIsAdmin(Dashboard)) } />
                        <Route exact path="/gallery" component={Gallery} />
                        <Route path="/blog" component={Blog} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default withStyles(styles)(AppContainer);