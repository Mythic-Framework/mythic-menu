/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Nui from '../../util/Nui';

const useStyles = makeStyles(theme => ({
    div: {
        border: `1px solid ${theme.palette.primary.main}25`,
        background: theme.palette.secondary.light,
        color: theme.palette.text.main,
        fontSize: 13,
        fontWeight: 500,
        height: 40,
        width: '100%',
        textAlign: 'center',
        userSelect: 'none',
        transition: 'all ease-in 0.15s',
        marginBottom: 5,
        borderRadius: 5,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `${theme.palette.primary.main}15`,
            borderColor: `${theme.palette.primary.main}60`,
            color: theme.palette.primary.light,
        },
    },
    error: {
        border: `1px solid ${theme.palette.error.main}50`,
        background: `${theme.palette.error.dark}40`,
        color: theme.palette.error.light,
        fontSize: 13,
        fontWeight: 500,
        height: 40,
        width: '100%',
        textAlign: 'center',
        userSelect: 'none',
        transition: 'all ease-in 0.15s',
        marginBottom: 5,
        borderRadius: 5,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `${theme.palette.error.dark}70`,
            borderColor: theme.palette.error.main,
        },
    },
    success: {
        border: `1px solid ${theme.palette.success.main}50`,
        background: `${theme.palette.success.dark}40`,
        color: theme.palette.success.light,
        fontSize: 13,
        fontWeight: 500,
        height: 40,
        width: '100%',
        textAlign: 'center',
        transition: 'all ease-in 0.15s',
        marginBottom: 5,
        borderRadius: 5,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `${theme.palette.success.dark}70`,
            borderColor: theme.palette.success.main,
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
