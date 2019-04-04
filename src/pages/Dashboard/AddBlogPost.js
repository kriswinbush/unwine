import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import RenderTextField from '../../components/RenderTextField';
import renderMultiField from '../../components/renderMultiField';
import { firebaseConnect } from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ImageUpload from './ImageUpload';
const styles = {
    root: {
        flexGrow: 1,
        padding: "20px"
    },
    textField: {
        width: "100%"
    },
    multiField: {
        
        width: "100%"
    },
    button: {
        width: "100%"
    },
    flex: {
        flex: 1
    },
    fileInput: {
        border: "2px dashed black",
        height: "100%"
    }
}

class AddBlogPost extends Component {
    handleSubmit = (values) => {
        const blogPost = { ...values, blogDate: Date.now() };

        //add author auth.currentUser
        if(blogPost.blogUploadImage) {
            let image = blogPost.blogUploadImage;
            // blogPost.blogUploadImage = 'https://www.google.com/images/spin-32.gif';
            this.props.firebase.push('blogPosts', blogPost)
                .then(data => {
                    let filePath = `blogposts/${data.key}/${image.name}`;
                    return this.props.firebase.storage().ref(filePath).put(image)
                        .then(snapShot => {
                            let fullPath = snapShot.metadata.fullPath;
                            return data.update({blogUploadImage: this.props.firebase.storage().ref(fullPath).toString()});
                        })
                }).catch(error => { 
                    console.log('There was an error uploading a file to Cloud Storage: ', error) 
                });
        } else {
            this.props.firebase.push('blogPosts', blogPost);
        }
        this.props.reset();
    }

    render() {
        const { classes, handleSubmit } = this.props; 
        return (
            <Grid className={classes.root} container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="headline" gutterBottom align="right">
                        Add a blog post
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    
                    <form onSubmit={handleSubmit(this.handleSubmit)}>

                        <Grid container spacing={16} alignItems="center">
                            <Grid item xs={11} md={8}>
                                <Field className={classes.textField} label="Title" id="userName" name="blogTitle" component={RenderTextField} type="text" />
                                <br/>
                                <Field className={classes.multiField} label="Thoughts" id="userEmail" name="blogText" component={renderMultiField} type="text" />
                                <br/>  
                            </Grid>
                            <Grid item xs={11} md={4}>
                                <Field name="blogUploadImage" component={ImageUpload} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" className={classes.button} variant="raised" color="primary">Post</Button>
                            </Grid>
                        </Grid>

                    </form>
                    
                </Grid>
            </Grid>
        )
    }
}

export default compose(
    firebaseConnect([
        'blogPosts',
        'blogPostsMeta'
    ]),
    withStyles(styles),
    reduxForm({
        form: 'blog'
    })
)(AddBlogPost);