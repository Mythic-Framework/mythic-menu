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
        background: theme.palette.secondary.dark,
        border: `1px solid ${theme.palette.primary.main}30`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${theme.palette.primary.main}15`,
        maxHeight: 800,
        width: '22%',
        position: 'absolute',
        top: '5%',
        left: '1%',
        borderRadius: 8,
        color: theme.palette.text.main,
        zIndex: 1000,
        overflow: 'hidden',
    },
    menuHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        background: theme.palette.secondary.dark,
        borderBottom: `1px solid ${theme.palette.primary.main}25`,
    },
    menuTitle: {
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: theme.palette.text.main,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    closeButton: {
        color: theme.palette.text.alt,
        width: 28,
        height: 28,
        minWidth: 28,
        padding: 0,
        borderRadius: 4,
        background: 'transparent',
        boxShadow: 'none',
        transition: 'color ease-in 0.15s, background ease-in 0.15s',
        '&:hover': {
            color: '#ff5555',
            background: 'rgba(255,85,85,0.12)',
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
            width: 4,
        },
        '&::-webkit-scrollbar-thumb': {
            background: `${theme.palette.primary.main}40`,
            borderRadius: 2,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.primary.main,
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
