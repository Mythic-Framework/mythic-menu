/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Nui from '../../util/Nui';

const useStyles = makeStyles(theme => ({
    div: {
        border: `1px solid rgba(32,134,146,0.2)`,
        background: 'rgba(32,134,146,0.05)',
        color: 'rgba(255,255,255,0.85)',
        fontSize: 11,
        fontWeight: 700,
        height: 38,
        width: '100%',
        textAlign: 'center',
        userSelect: 'none',
        transition: 'all 0.18s ease',
        marginBottom: 4,
        borderRadius: 3,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `rgba(32,134,146,0.15)`,
            borderColor: `rgba(32,134,146,0.55)`,
            color: '#4db8c4',
            boxShadow: '0 0 10px rgba(32,134,146,0.15)',
        },
    },
    error: {
        border: `1px solid rgba(110,22,22,0.5)`,
        background: `rgba(67,11,11,0.4)`,
        color: '#a13434',
        fontSize: 11,
        fontWeight: 700,
        height: 38,
        width: '100%',
        textAlign: 'center',
        userSelect: 'none',
        transition: 'all 0.18s ease',
        marginBottom: 4,
        borderRadius: 3,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `rgba(110,22,22,0.3)`,
            borderColor: '#6e1616',
            color: '#c44',
        },
    },
    success: {
        border: `1px solid rgba(32,134,146,0.4)`,
        background: `rgba(14,90,98,0.2)`,
        color: '#4db8c4',
        fontSize: 11,
        fontWeight: 700,
        height: 38,
        width: '100%',
        textAlign: 'center',
        transition: 'all 0.18s ease',
        marginBottom: 4,
        borderRadius: 3,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `rgba(32,134,146,0.28)`,
            borderColor: '#208692',
            boxShadow: '0 0 12px rgba(32,134,146,0.2)',
        },
    },
}));

export default ({ data }) => {
    const classes = useStyles();

    const onClick = () => {
        if (!data.options.disabled) {
            Nui.send('FrontEndSound', { sound: 'SELECT' });
            Nui.send('Selected', {
                id: data.id,
            });
        }
    };

    const cssClass = data.options.disabled
        ? `${data.options.success ? classes.success : classes.div} disabled`
        : data.options.success
        ? classes.success
        : data.options.error
        ? classes.error
        : classes.div;
    const style = data.options.disabled ? { opacity: 0.5 } : {};

    return (
        <Button className={cssClass} style={style} onClick={onClick}>
            {data.label}
        </Button>
    );
};
