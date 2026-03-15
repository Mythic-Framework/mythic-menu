/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
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
        userSelect: 'none',
        textAlign: 'center',
        transition: 'all ease-in 0.15s',
        marginBottom: 5,
        borderRadius: 5,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `${theme.palette.primary.main}15`,
            borderColor: `${theme.palette.primary.main}60`,
        },
    },
    icon: {
        width: '0.75em',
        height: '100%',
        fontSize: '1.1rem',
        color: theme.palette.primary.main,
        transition: 'color ease-in 0.15s',
    },
    iconChecked: {
        width: '0.75em',
        height: '100%',
        fontSize: '1.1rem',
        color: theme.palette.primary.main,
    },
    right: {
        width: '90%',
        textAlign: 'center',
        float: 'right',
    },
}));

export default ({ data }) => {
    const classes = useStyles();
    const [selected, setSelected] = useState(data.options.selected);

    const onClick = () => {
        setSelected(!selected);
        Nui.send('FrontEndSound', { sound: 'SELECT' });
        Nui.send('Selected', {
            id: data.id,
            data: { selected: !selected },
        });
    };

    return (
        <Button className={classes.div} onClick={onClick}>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    {selected ? (
                        <CheckBox className={classes.iconChecked} />
                    ) : (
                        <CheckBoxOutlineBlank className={classes.icon} />
                    )}
                </Grid>
                <Grid item xs={8}>
                    <span>{data.label}</span>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Button>
    );
};
