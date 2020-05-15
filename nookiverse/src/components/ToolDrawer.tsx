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
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ToolCounter from './ToolCounter';

import AxeIcon from './icons/AxeIcon';
import ButterflyNetIcon from './icons/ButterflyNetIcon';
import FishingRodIcon from './icons/FishingRodIcon';
import ShovelIcon from './icons/ShovelIcon';
import SlingshotIcon from './icons/SlingshotIcon';
import WateringCanIcon from './icons/WateringCanIcon';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      width: drawerWidth,
      flexShrink: 0,
    },
    closedDrawer: {
      width: 0
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
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const ToolDrawer: FunctionComponent<ToolDrawerProps> = ({ isOpen, handleCloseDrawer, width }) => {    
    const classes = useStyles();
    const theme = useTheme();

  return (
    <Drawer
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        className={isOpen ? classes.drawer : classes.closedDrawer}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{
          keepMounted: true,
        }}
        onClose={handleCloseDrawer}
        open={isOpen}
        variant={isWidthUp('sm', width) ? 'persistent' : 'temporary'}
    >
        {isWidthUp('sm', width) && 
          <div>
            <Toolbar />
            <Toolbar>
              <IconButton aria-label='close tool drawer' onClick={handleCloseDrawer}>
                {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </Toolbar>
            <Divider />
          </div>
        }
        <Box className={classes.drawerContainer}>
          <ToolCounter maxDurability={30} name='axe'>
              <SvgIcon component={AxeIcon} viewBox={isWidthUp('sm', width) ? "60 60 360 360" : "-40 -120 640 640"} />
          </ToolCounter>
          <ToolCounter maxDurability={30} name='net'>
              <SvgIcon component={ButterflyNetIcon} viewBox={isWidthUp('sm', width) ? "60 60 360 360" : "-40 -120 640 640"} />
          </ToolCounter>
          <ToolCounter maxDurability={30} name='fishing-rod'>
              <SvgIcon component={FishingRodIcon} viewBox={isWidthUp('sm', width) ? "60 60 360 360" : "-40 -120 640 640"} />
          </ToolCounter>
          <ToolCounter maxDurability={100} name='shovel'>
              <SvgIcon component={ShovelIcon} viewBox={isWidthUp('sm', width) ? "28 28 150 150" : "-14 -60 267 267"} />
          </ToolCounter>
          <ToolCounter maxDurability={20} name='slingshot'>
              <SvgIcon component={SlingshotIcon} viewBox={isWidthUp('sm', width) ? "8 0 48 48" : "-14 -22 85 85"} />
          </ToolCounter>
          <ToolCounter maxDurability={60} name='watering-can'>
              <SvgIcon component={WateringCanIcon} viewBox={isWidthUp('sm', width) ? "60 60 360 360" : "-40 -120 640 640"} />
          </ToolCounter>
        </Box>
    </Drawer>
  );
}

export default withWidth()(ToolDrawer);