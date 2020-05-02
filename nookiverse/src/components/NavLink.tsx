import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';

type Svg = {
  component: any;
  viewBox: string;
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'disabled'
    | 'action'
    | 'error'
    | undefined;
};

export type AppLink = {
  target: string;
  text: string;
  svg?: Svg;
};

type NavLinkProps = {
  link: AppLink;
};

export default function NavLink(props: NavLinkProps) {
  return (
    <Link to={'/' + props.link.target}>
      <ListItem button key={props.link.text}>
        {props.link.svg && (
          <ListItemIcon>
            <SvgIcon
              component={props.link.svg.component}
              viewBox={props.link.svg.viewBox}
              color={props.link.svg.color}
            />
          </ListItemIcon>
        )}
        <ListItemText primary={props.link.text} />
      </ListItem>
    </Link>
  );
}
