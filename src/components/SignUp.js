import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import { Field, reduxForm } from 'redux-form';
import RenderTextField from './RenderTextField';

import { firebaseConnect } from 'react-redux-firebase';

const styles = {
    root: {
        flex: 1,
        padding: "20px"
    },
    button: {
        width: "100%"
    },
    textField: {
        width: "100%",
        marginBottom: "10px"
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.userName) {
        errors.userName = 'Required'
    } else if (values.userName.length > 20) {
        errors.userName = 'Must be 20 characters or less'
    }
    if (!values.userEmail) {
        errors.userEmail = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userEmail)) {
        errors.userEmail = 'Invalid email address'
    }
    
    return errors;
}

class SignUp extends Component {

    handleSubmit = (values) => {
        this.props.firebase.push('subscribers', { email: values.userEmail, name: values.userName});
        this.props.reset();
    }
    render() {
        const { classes, handleSubmit } = this.props;
        return (
            <Grid container className={classes.root} align="center" justify="center" alignItems="center">
                <Grid item xs={12} md={9}>
                    <Typography variant="headline" gutterBottom align="center">
                        Enter your name and email address.
                    </Typography>
                    <form onSubmit={handleSubmit(this.handleSubmit)}>
                        <Field className={classes.textField} label="Name" id="userName" name="userName" component={RenderTextField} type="text" />
                        <br/>
                        <Field className={classes.textField} label="Email" id="userEmail" name="userEmail" component={RenderTextField} type="text" />
                        <br/>
                        <Button type="submit" className={classes.button} variant="raised" color="primary">Subscribe</Button>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

export default compose(
    firebaseConnect([
        'subscribers'
    ]),
    withStyles(styles),
    reduxForm({
        form: 'subscribe',
        validate
    }),
)(SignUp);
