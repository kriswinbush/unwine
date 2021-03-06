import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RenderTextField from '../../components/RenderTextField';
import renderMultiField from '../../components/renderMultiField';
import { Grid as DxGrid, Table as DxTable, TableHeaderRow as DxTableHeaderRow, TableSelection  } from '@devexpress/dx-react-grid-material-ui';
import { SelectionState } from '@devexpress/dx-react-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%"
    },
    textField: {
        width: "100%"
    },
    button: {
        width: "100%"
    }
});

class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            columns: [
                {name: 'name', title: "Subscriber"},
                {name: 'email', title: "e-mail"}
            ],
            rows: [],
            selection: [],
            selectedEmails: []
        }
        
    }
    handleClickOpen = () => this.setState({open: true});

    handleClose = () => this.setState({open: false});

    handleReset = () => {
        this.props.reset();
        this.setState({open: false, selection:[], selectedEmails: []})
    } 

    handleSubmit = (values) => {
        this.setState({open: false, selection:[], selectedEmails: []})    
        this.props.firebase.push('massMailer', values);
        this.props.reset();
    }

    changeSelection = (selection, selectedEmails) => {
        this.setState({ selection ,selectedEmails })
        this.props.changeFieldValue('emailList',selectedEmails.join(', '));
    }
    
    render() {
        const { classes, subscribers, handleSubmit } = this.props;
        return (
            <Grid container spacing={16} className={classes.root}>
                <Grid item xs={12}>
                  {subscribers && <DxGrid
                       columns={this.state.columns}
                       rows={Object.values(subscribers)}       
                   >
                      <SelectionState 
                        selection={this.state.selection}
                        onSelectionChange={(selection) => {
                            let stateSelected = selection.map(index =>{ 
                                return Object.values(subscribers)[index].email; 
                            });
                            this.changeSelection(selection, stateSelected);
                        }}
                      />
                      <DxTable />
                      <DxTableHeaderRow />
                      <TableSelection />          
                    </DxGrid>}
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={16} className={classes.root} alignItems="center">
                        <Grid item xs={6}>
                            <Button onClick={this.handleReset} variant="raised" color="secondary">Reset</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={classes.button} onClick={this.handleClickOpen} variant="raised" color="primary">Create e-mail</Button>
                        </Grid>
                    </Grid>
                
                
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <form onSubmit={handleSubmit(this.handleSubmit)}  >
                            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To subscribe to this website, please enter your email address here. We will send
                                    updates occasionally.
                                </DialogContentText>
                                
                                    <Grid container spacing={16} className={classes.formRoot}>
                                        <Grid item xs={12}>
                                            <Field className={classes.textField} multiline rows="2" label="emailList" id="emailList" name="emailList" component={RenderTextField} type="text" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field className={classes.textField} label="emailMessage" id="emailMessage" name="emailMessage" component={renderMultiField} type="text" />
                                        </Grid>
                                    </Grid>
                                
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleReset} color="primary">
                                    reset
                                </Button>
                                <Button onClick={this.handleClose} color="primary">
                                    cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    send
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
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
function mapDispatchToProps(dispatch) {
    return {
        changeFieldValue: function(field, value) {
            dispatch(change('sendMailer',field, value))
        }
    }
}
export default compose(
    reduxForm({
        form: 'sendMailer',
        enableReinitialize: true
    }),
    firebaseConnect([
        'subscribers',
        'massMailer'
    ]),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(SendEmail);