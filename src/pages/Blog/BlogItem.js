import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { firebaseConnect } from 'react-redux-firebase';
import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import ResolveImage from './ResolveImage';
import { Link } from 'react-router-dom';
//import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


const styles = {
    root: {
        flexGrow: 1,
        height: "100vh"
    },
    card : {
        height: "80%"
    }
}

class BlogItem extends Component {
    render() {
        const { classes, blogPosts, match, history } = this.props;
        let post;
        if(blogPosts){
            post = Object.values(blogPosts).filter(post => {
                return post.blogDate.toString() === match.params.blogItem.toString()
            });
        }
        return (
            <Grid container spacing={16} className={classes.root} justify="center">
                { post ? (post.map( (post, index) => {       
                    return (
                        <Grid key={index} item xs={10}>
                        <Card>
                            <CardMedia
                                className={classes.media}
                                image={post.blogTitle}
                                component={() => <ResolveImage post={post} />}
                                title={post.blogTitle}
                            />
                            <CardContent>
                                <h3>{post.blogTitle}</h3>
                                <h4>{new Date(post.blogDate).toLocaleString()}</h4>
                                <p>{post.blogText}</p>
                            </CardContent>
                            <CardActions>
                                <Button onClick={history.goBack}>Back</Button>
                                <Button component={Link} to={"/blog"}>Blog</Button>
                            </CardActions>
                            
                        </Card>
                        </Grid>
                    )
                }) ) : null }
            </Grid>

        )
    }
}

function mapStateToProps(state) {
    return {
        blogPosts: state.firebase.data['blogPosts']
    }
}

export default compose(
    firebaseConnect(['blogPosts']),
    connect(mapStateToProps),
    withStyles(styles)
)(BlogItem)