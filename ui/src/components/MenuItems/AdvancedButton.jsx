import React from 'react';
import Nui from '../../util/Nui';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    left: {
        display: 'inline-block',
        width: '50%',
        textAlign: 'left',
        paddingLeft: 10,
        fontSize: 11,
        opacity: 0.6,
        color: theme.palette.text.alt,
    },
    right: {
        display: 'inline-block',
        width: '50%',
        textAlign: 'right',
        paddingRight: 10,
        fontSize: 11,
        opacity: 0.6,
        color: theme.palette.primary.main,
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
