import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Button as MButton, Alert } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import Nui from '../../util/Nui';

import {
    AdvancedButton,
    Button,
    Checkbox,
    ColorList,
    ColorPicker,
    Slider,
    SubMenu,
    SubMenuBack,
    Ticker,
    Input,
    Number,
    Select,
    Text,
} from '../MenuItems';

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: 'rgba(12, 11, 26, 0.97)',
        border: `1px solid rgba(32,134,146,0.25)`,
        boxShadow: `0 0 0 1px rgba(32,134,146,0.08), 0 24px 60px rgba(0,0,0,0.75), 0 0 40px rgba(32,134,146,0.06)`,
        maxHeight: 800,
        width: '22%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 4,
        color: theme.palette.text.main,
        zIndex: 1000,
        overflow: 'hidden',
    },
    menuHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        background: 'rgba(32,134,146,0.07)',
        borderBottom: `1px solid rgba(32,134,146,0.2)`,
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(32,134,146,0.5), transparent)',
        },
    },
    menuTitle: {
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#ffffff',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    menuTitleAccent: {
        display: 'block',
        fontSize: 9,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(32,134,146,0.7)',
        marginBottom: 2,
    },
    closeButton: {
        color: 'rgba(255,255,255,0.4)',
        width: 26,
        height: 26,
        minWidth: 26,
        padding: 0,
        borderRadius: 3,
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'none',
        transition: 'all ease-in 0.15s',
        '&:hover': {
            color: '#ff6b6b',
            background: 'rgba(255,85,85,0.1)',
            borderColor: 'rgba(255,85,85,0.3)',
            boxShadow: 'none',
        },
    },
    buttons: {
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: 700,
        padding: '8px 10px 10px',
        display: 'block',
        '&::-webkit-scrollbar': {
            width: 3,
        },
        '&::-webkit-scrollbar-thumb': {
            background: `rgba(32,134,146,0.3)`,
            borderRadius: 2,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: `rgba(32,134,146,0.6)`,
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
    },
}));

export default props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu.menu);
    const [elements, setElements] = useState([]);
    useEffect(() => {
        setElements(
            menu.items.map((item, i) => {
                switch (item.type.toUpperCase()) {
                    case 'ADVANCED':
                        return (
                            <AdvancedButton
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'CHECKBOX':
                        return (
                            <Checkbox
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'SLIDER':
                        return (
                            <Slider
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'TICKER':
                        return (
                            <Ticker
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'COLORPICKER':
                        return (
                            <ColorPicker
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'COLORLIST':
                        return (
                            <ColorList
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'INPUT':
                        return (
                            <Input
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'NUMBER':
                        return (
                            <Number
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'SELECT':
                        return (
                            <Select
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'TEXT':
                        return (
                            <Text
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'SUBMENU':
                        return (
                            <SubMenu
                                key={`${menu.id}-${i}`}
                                id={i}
                                mId={menu.id}
                                data={item}
                            />
                        );
                    case 'GOBACK':
                        return (
                            <SubMenuBack
                                key={`${menu.id}-${i}`}
                                id={i}
                                mId={menu.id}
                                data={item}
                            />
                        );
                    default:
                        return (
                            <Button
                                key={`${menu.id}-${i}`}
                                id={i}
                                mId={menu.id}
                                data={item}
                            />
                        );
                }
            }),
        );
    }, [menu]);

    const onClick = () => {
        Nui.send('Close');
        dispatch({
            type: 'CLEAR_MENU',
        });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.menuHeader}>
                <div className={classes.menuTitle}>
                    {Boolean(menu.label) ? menu.label : 'Menu'}
                </div>
                <MButton className={classes.closeButton} onClick={onClick}>
                    <CloseIcon style={{ fontSize: 16 }} />
                </MButton>
            </div>
            <div className={classes.buttons}>
                {elements.length > 0 ? (
                    elements
                ) : (
                    <Alert variant="outlined" severity="info" style={{ margin: 8 }}>
                        Menu Has No Content
                    </Alert>
                )}
            </div>
        </div>
    );
};
