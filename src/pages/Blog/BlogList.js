import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ResolveImage from './ResolveImage';

import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%"
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: "auto",
        maxWidth: "100%",
        paddingTop: '56.25%', // 16:9
    }
}

class BlogList extends Component {
    render() {
        const { classes, blogPosts, match } = this.props;
        return (
            <Grid container spacing={16} className={classes.root} alignContent="space-around">
                { blogPosts ? (Object.values(blogPosts).map( (post, index) => {       
                    return (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardHeader
                                    title={post.blogTitle}
                                    subheader={new Date(post.blogDate).toLocaleString()}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={post.blogTitle}
                                    component={() => <ResolveImage post={post} />}
                                    title={post.blogTitle}
                                />
                                <CardContent>
                                    <Typography component="p">
                                        {post.blogText.substring(0, 200) + '...'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button component={Link} to={match.url + '/' + post.blogDate}>Read More</Button>
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
)(BlogList)