import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { AiOutlineTool } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';

type ColorString = "inherit" | "default" | "disabled" | "primary" | "secondary" | "action" | "error" | undefined;

type ToolCounterProps = {
    maxDurability: number
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

export default function ToolCounter(props: ToolCounterProps) {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const [color, setColor] = useState('primary');

    const changeColor = (durability: number) => {
        if(durability > props.maxDurability * 0.85) {
            setColor('error');
        } else if(durability >= Math.floor(props.maxDurability / 2)) {
            setColor('action');
        } else {
            setColor('primary');
        }
    }

    const handleClickIncrementCount = () => {
        if(count < props.maxDurability) {
            setCount(count + 1);
            changeColor(count + 1);
        }
    }

    const handleClickDecrementCount =  () => {
        if(count > 0) {
            setCount(count - 1);
            changeColor(count - 1);
        }
    }

    const handleClickReset = () => {
        setCount(0);
        changeColor(0);
    }

    return (
        <Box className={classes.flexColumn}>
            <Box className={classes.flexRow}>
                {count}
            </Box>
            <Box className={classes.flexRow}>
                <IconButton aria-label='increase tool count' onClick={handleClickDecrementCount}>
                    <FaMinus />
                </IconButton>
                <Icon classes={{
                    colorAction: classes.colorAction
                }} className={classes.toolIcon} color={color as ColorString} fontSize="large">
                    <AiOutlineTool />
                </Icon>
                <IconButton aria-label='decrease tool count' onClick={handleClickIncrementCount}>
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
    maxDurability: PropTypes.number.isRequired
}

ToolCounter.defaultProps = {
    maxDurability: 30
}