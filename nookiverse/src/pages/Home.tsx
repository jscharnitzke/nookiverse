import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    articleBox: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: theme.spacing(32),
        transition: 'all 2s ease-in-out',
        WebkitTransition:  'all 2s ease-in-out',
        MozTransition: 'all 2s ease-in-out'
    },
    articlePaper: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        margin: theme.spacing()
    },
    articleImage: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(8),
        },
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(32),
        },
    },
    articleSummary: {
        textAlign: 'justify'
    },
    articleText: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    articleTitle: {

    },
}));

// TODO: Change layout for mobile devices so that the image is inline with the title
export default function Home() {
    const classes = useStyles();

    return (
        <Box className={classes.articleBox} fontFamily="Baloo Bhaina 2">
            <Paper className={classes.articlePaper} elevation={3}>
                <Box className={classes.articleImage}>
                    <img style={{ marginBottom: 0 }} src={process.env.PUBLIC_URL + '/BuildingIconWork_x4.png'} alt='under construction' />
                </Box>
                <Box className={classes.articleText}>
                    <h1 className={classes.articleTitle}>Pardon our dust!</h1>
                    <p className={classes.articleSummary}>
                        Excuse the mess while we get Nookiverse in order. Tom and the Nooklings are hard at work making Nookiverse 
                        the best experience that it can be. Check back here for the latest news about Nookiverse, Animal Crossing, and more!
                    </p>
                </Box>
            </Paper>
        </Box>
    );
}