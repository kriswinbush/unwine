import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from "react-router-dom";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import styles from './styles';
import { withFirebase } from 'react-redux-firebase';
import Drawer from '@material-ui/core/Drawer';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';

class AppBarComponent extends Component {
    state = { anchorEl: null, left:false };
    
    handleMenu = event => this.setState({ anchorEl: event.currentTarget });
    toggleDrawer = (side, open) => () => this.setState({ [side]: open });
    handleClose = () => this.setState({ anchorEl: null });
    
    handleLogin = () => {
        this.setState({ anchorEl: null }); 
        this.props.history.push('/login');
    };

    handleLogout = () => {
        this.props.firebase.logout();
        this.setState({ anchorEl: null }); 
        this.props.history.push('/');
    };

    render() {
        const { classes, auth } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <AppBar position="fixed" color="default">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.flex}>
                            <img 
                                className={classes.logo}
                                src='/assets/images/unwine_logo_transparent_crop.png'
                                alt="Logo" 
                            />
                        </Typography>
                        
                    
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                {
                                    (auth.isEmpty !== true)
                                        ? <span> 
                                                <MenuItem component={Link} to={'/dashboard'} onClick={this.handleClose}>Dashboard</MenuItem>
                                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                          </span>
                                        : <MenuItem component={Link} to={'/login'} onClick={this.handleClose}>Login</MenuItem>
                                }
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} >
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer()}
                            onKeyDown={this.toggleDrawer()}
                        >
                            <MenuList>

                                <MenuItem component={Link} to={'/'} onClick={this.toggleDrawer('left', false)} >
                                    <ListItemIcon className={classes.icon}>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
                                </MenuItem>

                                <MenuItem component={Link} to={'/blog'} onClick={this.toggleDrawer('left', false)} >
                                    <ListItemIcon className={classes.icon}>
                                        <RssFeedIcon />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary="Blog" />
                                </MenuItem>

                                <MenuItem component={Link} to={'/gallery'} onClick={this.toggleDrawer('left', false)} >
                                    <ListItemIcon className={classes.icon}>
                                        <PhotoLibraryIcon />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary="Gallery" />
                                </MenuItem>

                                <MenuItem component={Link} to={'/dashboard'} onClick={this.toggleDrawer('left', false)}>
                                    <ListItemIcon className={classes.icon}>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary="Dashboard" />
                                </MenuItem>

                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </div>
                    </Drawer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default compose(
    withFirebase,
    withStyles(styles),
    withRouter,
    connect(mapStateToProps)
)(AppBarComponent);
