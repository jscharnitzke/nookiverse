import React, { FunctionComponent } from 'react';

import {
    makeStyles,
    createStyles,
    Theme,
    useTheme,
} from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'; 
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AxeIcon from '../components/AxeIcon';
import ButterflyNetIcon from '../components/ButterflyNetIcon';
import FishingRodIcon from '../components/FishingRodIcon';
import ShovelIcon from '../components/ShovelIcon';
import SlingshotIcon from '../components/SlingshotIcon';
import ToolCounter from '../components/ToolCounter';
import WateringCanIcon from '../components/WateringCanIcon';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: '100%'
    },
  })
);

type HandleCloseDrawerFunction = (event: React.MouseEvent) => void;

type ToolDrawerProps = {
  isOpen: boolean;
  handleCloseDrawer: HandleCloseDrawerFunction;
};

const ToolDrawer: FunctionComponent<ToolDrawerProps> = ({ isOpen, handleCloseDrawer }) => {
    const classes = useStyles();
    const theme = useTheme();

  return (
    <Drawer
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{
          keepMounted: true,
        }}
        onClose={handleCloseDrawer}
        open={isOpen}
        variant="persistent"
    >
        <Toolbar />
        <Toolbar>
          <IconButton aria-label='close tool drawer' onClick={handleCloseDrawer}>
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <Box className={classes.drawerContainer}>
          <ToolCounter maxDurability={30}>
              <SvgIcon component={AxeIcon} viewBox="60 60 360 360" />
          </ToolCounter>
          <ToolCounter maxDurability={30}>
              <SvgIcon component={ButterflyNetIcon} viewBox="60 60 360 360" />
          </ToolCounter>
          <ToolCounter maxDurability={30}>
              <SvgIcon component={FishingRodIcon} viewBox="60 60 360 360" />
          </ToolCounter>
          <ToolCounter maxDurability={100}>
              <SvgIcon component={ShovelIcon} viewBox="28 28 150 150" />
          </ToolCounter>
          <ToolCounter maxDurability={20}>
              <SvgIcon component={SlingshotIcon} viewBox="8 0 48 48" />
          </ToolCounter>
          <ToolCounter maxDurability={60}>
              <SvgIcon component={WateringCanIcon} viewBox="60 60 360 360" />
          </ToolCounter>
        </Box>
    </Drawer>
  );
}

export default ToolDrawer;