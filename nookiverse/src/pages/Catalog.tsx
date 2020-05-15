import React, { FunctionComponent, useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SvgIcon from '@material-ui/core/SvgIcon';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Accessory from '../components/icons/Accessory';
import Clothes from '../components/icons/Clothes';
import Everything from '../components/icons/Everything';
import Fencing from '../components/icons/Fencing';
import FossilCategory from '../components/icons/FossilCategory';
import FloorAndWall from '../components/icons/FloorAndWall';
import Palette from '../components/icons/Palette';

import { Item, SeasonalAvailability } from '../models/items';

import * as firebase from 'firebase';
import 'firebase/firestore';
import Music from '../components/icons/Music';
import Seasons from '../components/icons/Seasons';
import Tool from '../components/icons/Tool';
import EtcVertical from '../components/icons/EtcVertical';

type MasterFilter = {
    name: string,
    icon: React.FunctionComponent,
    viewBox?: string,
    categories?: string[],
}

type SubFilter = {
    name: string,
    icon: React.FunctionComponent,
    viewBox?: string,
}

const FilterButtons: {[index: string]: MasterFilter} = {
    Everything:{
        name: 'Everything',
        icon: Everything,
        viewBox: '39 68 50 50',
    },
    Art: {
        name: 'Art',
        icon: Palette,
        viewBox: '28 52 40 40',
        categories: [
            'Art',
        ]
    },
    Clothes: {
        name: 'Clothes',
        icon: Clothes,
        viewBox: '77 166 15 15',
        categories: [
            'Accessories',
            'Bags',
            'Bottoms',
            'Dress-Up',
            'Headwear',
            'Shoes',
            'Socks',
            'Tops',
            'Umbrellas',
        ]
    },
    Fencing: {
        name: 'Fencing',
        icon: Fencing,
        viewBox: '4 8 7 7',
        categories: ['Fencing'],
    },
    Fossils: {
        name: 'Fossils',
        icon: FossilCategory,
        viewBox: '104 148 17 17',
        categories: ['Fossils']
    },
    FloorsAndWalls: {
        name: 'Floors & Walls',
        icon: FloorAndWall,
        viewBox: '75 135 70 70',
        categories: [
            'Floors',
            'Rugs',
            'Wall-mounted',
            'Wallpapers',
        ]
    },
    Music: {
        name: 'Music',
        icon: Music,
        viewBox: '60 140 90 90',
        categories: [
            'Music',
        ]
    },
    Seasonal: {
        name: 'Seasonal',
        icon: Seasons,
        viewBox: '25 115 150 150',
    },
    Tools: {
        name: 'Tools',
        icon: Tool,
        viewBox: '35 68 60 60',
        categories: [
            'Tools'
        ]
    },
    Misc: {
        name: 'Miscellaneous',
        icon: EtcVertical,
        viewBox: '79 129 13 13',
        categories: [
            'Miscellaneous',
            'Other',
            'Photos',
            'Posters',
        ]
    },
}

const SubFilterButtons: {[index: string]: SubFilter[]} = {
    Clothes: [
        {
            name: 'Accessories',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Bags',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Bottoms',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Dress-Up',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Headwear',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Shoes',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Socks',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Tops',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Umbrellas',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
    ],
    'Floors & Walls': [
        {
            name: 'Floors',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Rugs',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Wall-mounted',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Wallpapers',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
    ],
    Miscellaneous: [
        {
            name: 'Miscellaneous',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Other',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Photos',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
        {
            name: 'Posters',
            icon: Accessory,
            viewBox: '142 132 15 15'
        },
    ]
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    catalog: {
        display: 'flex',
        flexDirection: 'row',
    },
    filterControls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    filterIcon: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(2),
        height: '100%',
        margin: 0,
        padding: 0,
        width: '100%',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
    },
    filterPaper: {
        borderRadius: theme.spacing(2),
        height: theme.spacing(8),
        margin: theme.spacing(1),
        width: theme.spacing(8),
    },
    hiddenRadio: {
        display: 'none'
    },
    list: {
        width: '50%',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxHeight: window.innerHeight - theme.spacing(7),
        },
        [theme.breakpoints.up('sm')]: {
            maxHeight: window.innerHeight - theme.spacing(18),
        },
    },
    listItem: {
        cursor: 'pointer',
        alignContent: 'center',
        borderRadius: '16px 16px',
    },
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    // TODO: change this to the in-game catalog color scheme @jscharnitzke
    shoppingBackground: {
        position: 'absolute',
        zIndex: -2,
        backgroundImage: 'url("' + process.env.PUBLIC_URL + 'CatalogBackgroundPattern.png")',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        opacity: 0.7,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    shoppingBackgroundOverlay: {
        position: 'absolute',
        zIndex: -1,
        backgroundColor: '#e9f5eb',
        opacity: 0.7,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    shoppingDisplay: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    shoppingWindow: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
    }
}));

const Catalog: FunctionComponent = () => {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(30);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [selectedFilter, setSelectedFilter] = useState(FilterButtons.Everything);
    const [selectedSubFilter, setSelectedSubFilter] = useState({});

    // componentShouldUpdate
    useEffect(() => {
        setLoading(true);
        
        const itemPromise = selectedFilter === FilterButtons.Everything ?
            firebase.firestore().collection('items').limit(limit).orderBy('index').get() :
            selectedFilter === FilterButtons.Seasonal ?
                firebase.firestore().collection('items').where(
                    'seasonalAvailability', 
                    'in', 
                    [SeasonalAvailability.Summer, SeasonalAvailability.Winter]
                    ).limit(limit).orderBy('index').get() :
                firebase.firestore().collection('items').where(
                    'category', 
                    'in', 
                    selectedFilter.categories
                    ).limit(limit).orderBy('index').get();
        
        itemPromise.then((itemsRef) => {
            const fetchedItems = itemsRef.docs.map(doc => doc.data() as Item)
            setItems(fetchedItems);
            setSelectedItem(fetchedItems[0]);
        }).finally(() => {
            setLoading(false);
        });
    }, [page, limit, selectedFilter]);
    
    return (   
        <Box className={classes.root}>
            <RadioGroup className={classes.filterControls}>
                {Object.values(FilterButtons).map((filter: MasterFilter) => (
                    <Paper 
                        className={classes.filterPaper} 
                        elevation={selectedFilter === filter ? 0 : 3}
                        key={filter.name}
                    >
                        <FormControlLabel
                            className={classes.filterIcon}
                            control={<Radio className={classes.hiddenRadio} />}
                            label={(<SvgIcon
                                color="secondary"
                                component={filter.icon}
                                viewBox={filter.viewBox}
                            />)}
                            labelPlacement="top"
                            onClick={() => setSelectedFilter(filter)}
                            value={filter.name}
                        />
                    </Paper>
                ))}
            </RadioGroup>
            {!loading ? (
                <Box className={classes.catalog}>
                    <Box className={classes.shoppingWindow}>
                        <Box className={classes.shoppingBackground}></Box>
                        <Box className={classes.shoppingBackgroundOverlay}></Box>
                        <Box className={classes.shoppingDisplay}>
                            { selectedItem && 
                                <img src={
                                        selectedItem.variants[0].imagePath  
                                        || selectedItem.variants[0].closetImage 
                                        || selectedItem.variants[0].framedImage
                                        || selectedItem.variants[0].storageImage
                                        || ''
                                    } 
                                    alt={selectedItem.name} 
                                />
                            }
                        </Box>
                    </Box>
                    <List className={classes.list}>
                    {items.map(item => (
                        <ListItem 
                            className={classes.listItem} 
                            key={item.name} 
                            onMouseOver={() => setSelectedItem(item)}
                            onMouseDown={() => setSelectedItem(item)}
                            style={{ background: item === selectedItem ? 'repeating-linear-gradient(-45deg, #39cd7e, #39cd7e 10px, #29bd6e 10px, #29bd6e 20px)' : 'transparent'}}
                        >
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem> 
                    ))}
                    </List>
                </Box>) :
                (<div>Loading...</div>)
            }
        </Box>
    ) ;
}

export default Catalog;