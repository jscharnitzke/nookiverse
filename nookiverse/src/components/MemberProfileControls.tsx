import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    materialIcon: {
        fontFamily: ['Roboto', 'Arial'].join(',')
    },
  }),
);

type MemberProfileControlsProps = {
  handleLogoutClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Controls for existing members to customize their profiles or log out.
 */
export default function MemberProfileControls(props: MemberProfileControlsProps) {
    const classes = useStyles();

    return (
        <Box display="flex" className={classes.root} alignItems="center" justifyItems="flex-end">
          <Avatar></Avatar>
          <IconButton onClick={props.handleLogoutClick}>
            <ExitToApp />
          </IconButton>
        </Box>
    );
}

MemberProfileControls.propTypes = {
  handleLogoutClick: PropTypes.func.isRequired
}