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
import Furniture from '../components/icons/Furniture';
import Bag from '../components/icons/Bag';
import Bottoms from '../components/icons/Bottoms';
import Onepiece from '../components/icons/Onepiece';
import Hat from '../components/icons/Hat';
import Shoes from '../components/icons/Shoes';
import Socks from '../components/icons/Socks';
import Umbrella from '../components/icons/Umbrella';
import Rug from '../components/icons/Rug';
import WallMount from '../components/icons/WallMount';
import Wall from '../components/icons/Wall';
import Goods from '../components/icons/Goods';
import Villager from '../components/icons/Villager';
import Floor from '../components/icons/Floor';

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
    Housewares: {
        name: 'Housewares',
        icon: Furniture,
        viewBox: '65 135 220 220',
        categories: [
            'Housewares'
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
            viewBox: '135 120 30 30'
        },
        {
            name: 'Bags',
            icon: Bag,
            viewBox: '-120 100 200 200'
        },
        {
            name: 'Bottoms',
            icon: Bottoms,
            viewBox: '20 80 150 150'
        },
        {
            name: 'Dress-Up',
            icon: Onepiece,
            viewBox: '-20 0 256 256'
        },
        {
            name: 'Headwear',
            icon: Hat,
            viewBox: '160 40 256 256'
        },
        {
            name: 'Shoes',
            icon: Shoes,
            viewBox: '60 100 180 180'
        },
        {
            name: 'Socks',
            icon: Socks,
            viewBox: '60 100 400 400'
        },
        {
            name: 'Tops',
            icon: Clothes,
            viewBox: '73 155 24 24'
        },
        {
            name: 'Umbrellas',
            icon: Umbrella,
            viewBox: '40 100 512 512'
        },
    ],
    'Floors & Walls': [
        {
            name: 'Floors',
            icon: Floor,
            viewBox: '40 100 300 300'
        },
        {
            name: 'Rugs',
            icon: Rug,
            viewBox: '40 100 512 512'
        },
        {
            name: 'Wall-mounted',
            icon: WallMount,
            viewBox: '40 100 512 512'
        },
        {
            name: 'Wallpapers',
            icon: Wall,
            viewBox: '40 100 512 512'
        },
    ],
    Miscellaneous: [
        {
            name: 'Miscellaneous',
            icon: EtcVertical,
            viewBox: '70 115 30 30'
        },
        {
            name: 'Other',
            icon: Goods,
            viewBox: '40 100 512 512'
        },
        {
            name: 'Photos & Posters',
            icon: Villager,
            viewBox: '40 100 512 512'
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
            height: window.innerHeight - theme.spacing(37),
        },
        [theme.breakpoints.up('sm')]: {
            height: window.innerHeight - theme.spacing(18),
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
    },
    subFilterControls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    subFilterIcon: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(1),
        height: '100%',
        margin: 0,
        padding: 0,
        width: '100%',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
    },
    subFilterPaper: {
        borderRadius: theme.spacing(1),
        height: theme.spacing(5),
        margin: theme.spacing(1),
        width: theme.spacing(5),
    },
}));

const Catalog: FunctionComponent = () => {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(30);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [selectedFilter, setSelectedFilter] = useState(FilterButtons.Everything);
    const [selectedSubFilter, setSelectedSubFilter] = useState<SubFilter>();

    // componentShouldUpdate
    useEffect(() => {
        setLoading(true);

        if(selectedSubFilter) {
            return;
        }
        
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

    useEffect(() => {
        setLoading(true);

        if(!selectedSubFilter) {
            setLoading(false);
            return;
        }

        const itemQuery = selectedSubFilter.name === 'Photos & Posters' ? 
            firebase.firestore().collection('items').where(
                'category',
                'in',
                ['Photos', 'Posters']
            ) :
            firebase.firestore().collection('items').where(
                'category',
                '==',
                selectedSubFilter.name
            );

        itemQuery.limit(limit).orderBy('index').get().then((itemsRef) => {
            const fetchedItems = itemsRef.docs.map(doc => doc.data() as Item)
            setItems(fetchedItems);
            setSelectedItem(fetchedItems[0]);
        }).finally(() => {
            setLoading(false);
        });


    }, [page, limit, selectedSubFilter]);

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
                            label={(
                                <SvgIcon
                                    color="secondary"
                                    component={filter.icon}
                                    viewBox={filter.viewBox}
                                />
                            )}
                            labelPlacement="top"
                            onClick={() => setSelectedFilter(filter)}
                            value={filter.name}
                        />
                    </Paper>
                ))}
            </RadioGroup>
            { selectedFilter && 
                <RadioGroup className={classes.subFilterControls}>
                    {SubFilterButtons[selectedFilter.name] && Object.values(SubFilterButtons[selectedFilter.name]).map((subFilter: SubFilter) => (
                        <Paper 
                            className={classes.subFilterPaper} 
                            elevation={selectedSubFilter === subFilter ? 0 : 3}
                            key={subFilter.name}
                        >
                            <FormControlLabel
                                className={classes.subFilterIcon}
                                control={<Radio className={classes.hiddenRadio} />}
                                label={(
                                    <SvgIcon
                                        color="secondary"
                                        component={subFilter.icon}
                                        viewBox={subFilter.viewBox}
                                    />
                                )}
                                labelPlacement="top"
                                onClick={() => setSelectedSubFilter(subFilter)}
                                value={subFilter.name}
                            />
                        </Paper>
                    ))}
                </RadioGroup>
            }
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