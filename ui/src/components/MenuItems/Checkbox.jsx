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
        border: `1px solid rgba(32,134,146,0.2)`,
        background: 'rgba(32,134,146,0.05)',
        color: 'rgba(255,255,255,0.85)',
        fontSize: 11,
        fontWeight: 700,
        height: 38,
        width: '100%',
        userSelect: 'none',
        textAlign: 'center',
        transition: 'all 0.18s ease',
        marginBottom: 4,
        borderRadius: 3,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `rgba(32,134,146,0.12)`,
            borderColor: `rgba(32,134,146,0.5)`,
            color: '#4db8c4',
        },
    },
    icon: {
        width: '0.75em',
        height: '100%',
        fontSize: '1.0rem',
        color: 'rgba(32,134,146,0.5)',
        transition: 'color 0.18s ease',
    },
    iconChecked: {
        width: '0.75em',
        height: '100%',
        fontSize: '1.0rem',
        color: '#208692',
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
