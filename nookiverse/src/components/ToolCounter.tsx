import React, { useEffect, useState, FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import { useCookies } from 'react-cookie';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { AiOutlineTool } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';

type ColorString = "inherit" | "default" | "disabled" | "primary" | "secondary" | "action" | "error" | undefined;

type ToolCounterProps = {
    maxDurability: number,
    name: string,
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8em'
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.5em'
        },
    },
    toolIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
    },
    colorAction: {
        color: '#f1e26f'
    }
}));

const ToolCounter: FunctionComponent<ToolCounterProps> = ({ maxDurability, name, width, children }) => {
    const counterName = name + 'Count';
    const [cookies, setCookie] = useCookies([counterName]);

    const classes = useStyles();
    const [count, setCount] = useState(cookies[counterName] ? +cookies[counterName] : 0);
    const [color, setColor] = useState('primary');

    useEffect(() => {
        let authListener = firebase.auth().onAuthStateChanged(async user => {
            if(user) { 
                const userSettingsDoc = await firebase.firestore().collection('userSettings').doc(firebase.auth().currentUser?.uid).get();
                const storedCount = userSettingsDoc.get(counterName);
                
                if(storedCount) {
                    setCount(+storedCount);
                }
            }
        }, (e: firebase.auth.Error) => {
            console.error(e);
        });

        return (() => authListener());
    }, [counterName]);

    useEffect(() => {
        if(count === maxDurability) {
            setColor('disabled');
        } else if(count > maxDurability * 0.85) {
            setColor('error');
        } else if(count >= Math.floor(maxDurability / 2)) {
            setColor('action');
        } else {
            setColor('primary');
        }
    }, [count, maxDurability])

    useEffect(() => {
        setCookie(counterName, count, { path: '/', domain: '.nookiverse.com', sameSite: 'strict' });
        
        if(!firebase.auth().currentUser) {
            return;
        }

        const userSettingsRef = firebase.firestore().collection('userSettings').doc(firebase.auth().currentUser?.uid);
        const countObject: {[index: string]: number} = {};
        countObject[counterName] = count;
        userSettingsRef.set(countObject, {merge: true});

    }, [count, counterName, setCookie])

    const handleClickIncrementCount = () => {
        if(count < maxDurability) {
            setCount(count + 1);
        }
    }

    const handleClickDecrementCount =  () => {
        if(count > 0) {
            setCount(count - 1);
        }
    }

    const handleClickReset = () => {
        setCount(0);
    }

    return (
        <Box className={classes.flexColumn} aria-label={name + ' counter'}>
            <Box className={classes.flexRow}>
                {count}
            </Box>
            <Box className={classes.flexRow}>
                <IconButton 
                    aria-label='increase tool count' 
                    disabled={count === 0} 
                    onClick={handleClickDecrementCount} 
                    size="medium"
                >
                    <FaMinus />
                </IconButton>
                <Icon 
                    classes={{ colorAction: classes.colorAction  }} 
                    className={classes.toolIcon} 
                    color={color as ColorString} 
                    fontSize={isWidthUp('sm', width) ? 'large' : 'small'}
                >
                    { children ? children : <AiOutlineTool /> }
                </Icon>
                <IconButton 
                    aria-label='decrease tool count' 
                    disabled={count === maxDurability} 
                    onClick={handleClickIncrementCount} 
                    size="medium"
                >
                    <FaPlus />
                </IconButton>
            </Box>
            <Box className={classes.flexRow}>
                <Button aria-label="reset counter" onClick={handleClickReset}>Reset</Button>
            </Box>
        </Box> 
    );
}

ToolCounter.propTypes = {
    maxDurability: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

ToolCounter.defaultProps = {
    maxDurability: 30
}

export default withWidth()(ToolCounter)
