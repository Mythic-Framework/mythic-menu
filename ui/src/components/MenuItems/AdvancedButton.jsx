import React from 'react';
import Nui from '../../util/Nui';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    left: {
        display: 'inline-block',
        width: '50%',
        textAlign: 'left',
        paddingLeft: 10,
        fontSize: 11,
        opacity: 0.6,
        color: 'rgba(255,255,255,0.6)',
    },
    right: {
        display: 'inline-block',
        width: '50%',
        textAlign: 'right',
        paddingRight: 10,
        fontSize: 11,
        opacity: 0.8,
        color: '#4db8c4',
    },
}));

export default ({ data }) => {
    const classes = useStyles();

    const onClick = () => {
        Nui.send('FrontEndSound', { sound: 'SELECT' });
        Nui.send('Selected', {
            id: data.id,
        });
    };

    return (
        <Button className={classes.div} onClick={onClick}>
            <Grid container>
                <Grid item xs={2}>
                    {data.options.secondaryLabel}
                </Grid>
                <Grid item xs={8}>
                    {data.label}
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Button>
    );
};
