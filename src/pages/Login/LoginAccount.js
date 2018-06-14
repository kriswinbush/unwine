import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import  RenderTextField  from '../../components/RenderTextField';
import { withFirebase } from 'react-redux-firebase';
import Grid from '@material-ui/core/Grid';
//import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1
    },
    title: {
        margin: "10px"
    },
    textField: {
        width: "100%"
    },
    button: {
        width:"100%"
    }
}

class LoginAccount extends Component {
    submitHandler = (values) => {
        this.props.firebase.login({email: values.userName, password: values.userPassword})
            .then( user => {
                this.props.reset();
                setTimeout(() => this.props.history.push('/dashboard', 2000));
            })
            .catch(err => console.log(err));
    }
    render() {
        const { classes, handleSubmit/* , match  */} = this.props;
        return (
            <div className={classes.root}>
            <Grid container justify="center" className={classes.root} spacing={0}>
                    <Grid item xs={11}>
                <Card className={classes.nest}>
                    <Typography className={classes.title} variant="headline" component="h2" align="center">
                        Login In
                    </Typography>
                    <form onSubmit={handleSubmit(this.submitHandler)}>
                        <CardContent>
                            <Field className={classes.textField} label="e-mail" name="userName" component={RenderTextField} type="text" />
                            <Field className={classes.textField} label="Password" name="userPassword" component={RenderTextField}  type="text" />
                        </CardContent>
                        <CardActions>
                            <Grid container justify="center" className={classes.root} spacing={16}>
                                <Grid item xs={12}>
                                    <Button className={classes.button} type="submit" variant="raised" color="primary">Login In</Button>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Button className={classes.button} component={Link} to={match.url +"/create"}  variant="raised">Create an Account</Button>
                                </Grid> */}
                            </Grid>
                        </CardActions>
                    </form>
                </Card>
                </Grid>
                </Grid>
            </div>
        )
    }
}

export default compose (
    withFirebase,
    reduxForm({form: 'login'}),
    withStyles(styles)
)(LoginAccount);