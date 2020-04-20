import React from 'react';
import { Avatar, Link } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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

/**
 * Controls for existing members to customize their profiles or log out.
 */
// TODO: Change Log Out link to a button w/ text
// TODO: Modify styling so that the avatar and logout controls are inline
export default function MemberProfileControls() {
    const classes = useStyles();
    const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

    return (
        <div className={classes.root}>
            <Link href="#" onClick={preventDefault} className={classes.materialIcon}>
                <ExitToApp color="secondary" />
            </Link>
            <Link href="#" onClick={preventDefault}>
                <Avatar alt="User">U</Avatar>
            </Link>
        </div>
    );
}