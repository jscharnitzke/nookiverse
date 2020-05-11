import React, { useState, FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import { useCookies } from 'react-cookie';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { FirestoreMutation } from '@react-firebase/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AiOutlineTool } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';

type ColorString = "inherit" | "default" | "disabled" | "primary" | "secondary" | "action" | "error" | undefined;

type ToolCounterProps = {
    maxDurability: number,
    name: string
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
        fontSize: '1.5em'
    },
    toolIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorAction: {
        color: '#f1e26f'
    }
}));

const ToolCounter: FunctionComponent<ToolCounterProps> = ({ maxDurability, name, children }) => {
    const [cookies, setCookie] = useCookies([name + '-counter']);

    const classes = useStyles();
    const [count, setCount] = useState(cookies[name + '-counter'] ? +cookies[name + '-counter'] : 0);
    const [color, setColor] = useState('primary');

    const changeColor = (durability: number) => {
        if(durability === maxDurability) {
            setColor('disabled');
        } else if(durability > maxDurability * 0.85) {
            setColor('error');
        } else if(durability >= Math.floor(maxDurability / 2)) {
            setColor('action');
        } else {
            setColor('primary');
        }
    }

    const upsertFirestoreRecord = (newCount: number) => {
        if(!firebase.auth().currentUser) {
            return;
        }

        const userSettingsRef = firebase.firestore().collection('userSettings').doc(firebase.auth().currentUser?.uid);
        const countObject: {[index: string]: number} = {};
        countObject[name + 'Count'] = newCount;
        userSettingsRef.set(countObject, {merge: true});
    }

    const handleClickIncrementCount = () => {
        if(count < maxDurability) {
            setCount(count + 1);
            changeColor(count + 1);
            setCookie(name + '-counter', count + 1, { path: '/' });
            upsertFirestoreRecord(count + 1);
        }
    }

    const handleClickDecrementCount =  () => {
        if(count > 0) {
            setCount(count - 1);
            changeColor(count - 1);
            setCookie(name + '-counter', count - 1, { path: '/' });
            upsertFirestoreRecord(count - 1);
        }
    }

    const handleClickReset = () => {
        setCount(0);
        changeColor(0);
        setCookie(name + '-counter', 0, { path: '/' });
        upsertFirestoreRecord(0);
    }

    return (
        <Box className={classes.flexColumn} aria-label={name + ' counter'}>
            <Box className={classes.flexRow}>
                {count}
            </Box>
            <Box className={classes.flexRow}>
                <IconButton aria-label='increase tool count' disabled={count === 0} onClick={handleClickDecrementCount}>
                    <FaMinus />
                </IconButton>
                <Icon classes={{
                    colorAction: classes.colorAction
                }} className={classes.toolIcon} color={color as ColorString} fontSize="large">
                    { children ? children : <AiOutlineTool /> }
                </Icon>
                <IconButton aria-label='decrease tool count' disabled={count === maxDurability} onClick={handleClickIncrementCount}>
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

export default ToolCounter
