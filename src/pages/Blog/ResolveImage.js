import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withFirebase } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
const styles = {
    root: {
        flexGrow: 1
    },
    image : {
        maxWidth: "100%",
        height: "auto"
    }
}
class ResolveImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: ""
        }
    }
    componentDidMount() {
        const { firebase: {storage} } = this.props;

        if(this.props.post.blogUploadImage) {
            storage().refFromURL(this.props.post.blogUploadImage).getDownloadURL()
            .then(url => this.setState({imageUrl: url}))
        } else {
            this.setState({imageUrl: 'assets/images/code.png'})
        }
    }

    render() {
        const { blogTitle, classes } = this.props;
        return (<img className={classes.image} src={this.state.imageUrl} alt={blogTitle} />)
    }
}

export default compose(
    withFirebase,
    withStyles(styles)
)(ResolveImage);
