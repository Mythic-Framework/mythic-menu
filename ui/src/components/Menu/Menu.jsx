import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button as MButton, Alert, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
        top: 0,
        left: 0,
        borderRadius: 4,
        color: theme.palette.text.main,
        zIndex: 1000,
        overflow: 'hidden',
    },
    menuHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '12px 14px',
        background: 'rgba(32,134,146,0.07)',
        borderBottom: `1px solid rgba(32,134,146,0.2)`,
        position: 'relative',
        flexShrink: 0,
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
        flex: 1,
        minWidth: 0,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#ffffff',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    headerActions: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
    },
    menuHeaderDraggable: {
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        '&:active': {
            cursor: 'grabbing',
        },
    },
    menuHeaderLocked: {
        cursor: 'default',
    },
    menuTitleAccent: {
        display: 'block',
        fontSize: 9,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(32,134,146,0.7)',
        marginBottom: 2,
    },
    headerIconButton: {
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
            boxShadow: 'none',
        },
    },
    lockButton: {
        '&:hover': {
            color: '#208692',
            background: 'rgba(32,134,146,0.12)',
            borderColor: 'rgba(32,134,146,0.35)',
        },
    },
    lockButtonActive: {
        color: '#208692',
        borderColor: 'rgba(32,134,146,0.45)',
        background: 'rgba(32,134,146,0.15)',
    },
    closeButton: {
        '&:hover': {
            color: '#ff6b6b',
            background: 'rgba(255,85,85,0.1)',
            borderColor: 'rgba(255,85,85,0.3)',
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

const DEFAULT_POSITION = { x: 24, y: 24 };

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu.menu);
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [locked, setLocked] = useState(false);
    const wrapperRef = useRef(null);
    const headerRef = useRef(null);
    const dragRef = useRef(null);
    const positionRef = useRef(DEFAULT_POSITION);
    positionRef.current = position;

    const clampPosition = useCallback((x, y) => {
        const el = wrapperRef.current;
        if (!el) return { x, y };
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const maxX = Math.max(0, window.innerWidth - w);
        const maxY = Math.max(0, window.innerHeight - h);
        return {
            x: Math.min(maxX, Math.max(0, x)),
            y: Math.min(maxY, Math.max(0, y)),
        };
    }, []);

    useEffect(() => {
        const onResize = () => {
            setPosition(p => clampPosition(p.x, p.y));
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [clampPosition]);

    const onHeaderPointerDown = useCallback(
        e => {
            if (locked) return;
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            if (e.target.closest('button')) return;
            const pos = positionRef.current;
            dragRef.current = {
                pointerId: e.pointerId,
                startX: e.clientX,
                startY: e.clientY,
                originX: pos.x,
                originY: pos.y,
            };
            if (headerRef.current) {
                headerRef.current.setPointerCapture(e.pointerId);
            }
        },
        [locked],
    );

    const onHeaderPointerMove = useCallback(
        e => {
            const d = dragRef.current;
            if (!d || d.pointerId !== e.pointerId) return;
            const dx = e.clientX - d.startX;
            const dy = e.clientY - d.startY;
            setPosition(clampPosition(d.originX + dx, d.originY + dy));
        },
        [clampPosition],
    );

    const onHeaderPointerUp = useCallback(
        e => {
            const d = dragRef.current;
            if (!d || d.pointerId !== e.pointerId) return;
            dragRef.current = null;
            if (headerRef.current?.releasePointerCapture) {
                try {
                    headerRef.current.releasePointerCapture(e.pointerId);
                } catch {
                    // already released
                }
            }
            setPosition(p => clampPosition(p.x, p.y));
        },
        [clampPosition],
    );

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
        <div
            ref={wrapperRef}
            className={classes.wrapper}
            style={{ left: position.x, top: position.y }}
        >
            <div
                ref={headerRef}
                className={`${classes.menuHeader} ${
                    locked ? classes.menuHeaderLocked : classes.menuHeaderDraggable
                }`}
                onPointerDown={onHeaderPointerDown}
                onPointerMove={onHeaderPointerMove}
                onPointerUp={onHeaderPointerUp}
                onPointerCancel={onHeaderPointerUp}
            >
                <div className={classes.menuTitle}>
                    {Boolean(menu.label) ? menu.label : 'Menu'}
                </div>
                <div className={classes.headerActions}>
                    <Tooltip
                        title={locked ? 'Unlock position' : 'Lock position'}
                        arrow
                        placement="bottom"
                    >
                        <MButton
                            type="button"
                            aria-pressed={locked}
                            aria-label={locked ? 'Unlock menu position' : 'Lock menu position'}
                            className={`${classes.headerIconButton} ${classes.lockButton} ${
                                locked ? classes.lockButtonActive : ''
                            }`}
                            onClick={() => setLocked(v => !v)}
                        >
                            {locked ? (
                                <LockIcon style={{ fontSize: 15 }} />
                            ) : (
                                <LockOpenIcon style={{ fontSize: 15 }} />
                            )}
                        </MButton>
                    </Tooltip>
                    <Tooltip title="Close" arrow placement="bottom">
                        <MButton
                            type="button"
                            aria-label="Close menu"
                            className={`${classes.headerIconButton} ${classes.closeButton}`}
                            onClick={onClick}
                        >
                            <CloseIcon style={{ fontSize: 16 }} />
                        </MButton>
                    </Tooltip>
                </div>
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
