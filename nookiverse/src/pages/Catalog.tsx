import React, { FunctionComponent, useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import * as firebase from 'firebase';
import 'firebase/firestore';

type Item = {
    catalog: string,
    category: string,
    customizationKitCost: number,
    diy: boolean,
    interact: string,
    lightingType: string,
    name: string,
    patternCustomize: boolean,
    patternTitle: string,
    series: string,
    set: string,
    size: string,
    sourceNotes: string,
    speakerType: string,
    tag: string,
    variants: ItemVariant[],
    version: string
}

type ItemVariant = {
    BodyCustomize: boolean,
    BodyTitle: string,
    BuyPrice: number,
    Colors: string[],
    Filename: string,
    ImagePath: string,
    InternalID: number,
    Pattern: string,
    SellPrice: number,
    Source: string[],
    Themes: string[],
    VariantID: string,
    Variation: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    catalog: {
        display: 'flex',
        flexDirection: 'row',
    },
    list: {
        width: '50%',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxHeight: window.innerHeight - theme.spacing(7),
        },
        [theme.breakpoints.up('sm')]: {
            maxHeight: window.innerHeight - theme.spacing(8),
        },
    },
    listItem: {
        cursor: 'pointer',
        alignContent: 'center',
        borderRadius: '16px 16px',
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

    // componentShouldUpdate
    useEffect(() => {
        setLoading(true);
        firebase.firestore().collection('items').limit(limit).orderBy('name').get().then((itemsRef) => {
            const fetchedItems = itemsRef.docs.map(doc => doc.data() as Item)
            setItems(fetchedItems);
            setSelectedItem(fetchedItems[0]);
        }).finally(() => {
            setLoading(false);
        });
    }, [page, limit]);
    
    // TODO: Add category filters to top of shopping window
    // TODO: Add alphabet jump links to the left of the list
    return !loading ? 
        (
            <Box className={classes.catalog}>
                <Box className={classes.shoppingWindow}>
                    <Box className={classes.shoppingBackground}></Box>
                    <Box className={classes.shoppingBackgroundOverlay}></Box>
                    <Box className={classes.shoppingDisplay}>
                        { selectedItem && 
                            <img src={selectedItem.variants[0].ImagePath} alt={selectedItem.name} />
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
            </Box>
        ) :
        (<div>Loading...</div>);
}

export default Catalog;