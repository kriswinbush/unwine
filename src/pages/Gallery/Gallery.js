import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import ResolveImage from '../Blog/ResolveImage';
import Typography from '@material-ui/core/Typography';
import Loading from '../../components/Loading';
const styles = {
    root: {
      flexGrow: 1,
      backgroundColor: "rgba(218,55,50, 1.0)",
      height: "100%",
      marginTop: "55px"
    },
    img: {
        backgroundColor: "rgba(163,60,96, 1.0)"
    }
}

class Gallery extends Component {

    render() {
        const { classes, blogPosts } = this.props;
        let blogPostTiles = blogPosts && Object.values(blogPosts).map((post, index) => (
            <GridListTile className={classes.img} key={index} cols={Math.floor(Math.random() * Math.floor(4))}>
                    <ResolveImage post={post} />
            </GridListTile>
        ));
        return (
            <Grid className={classes.root} container spacing={0} justify="center">
                <Grid item xs={12}>
                    <Typography variant="display3" gutterBottom>
                        Gallery
                    </Typography> 
                </Grid>
                <Grid item xs={12}>
                    <GridList cellHeight={160} className={classes.gridList} cols={4}>
                        {blogPostTiles || <Loading />}
                    </GridList>
                </Grid>
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
)(Gallery)