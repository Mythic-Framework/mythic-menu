import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Nui from '../../util/Nui';

const useStyles = makeStyles(theme => ({
    div: {
        width: '100%',
        border: `1px solid rgba(32,134,146,0.4)`,
        background: `rgba(32,134,146,0.1)`,
        color: '#4db8c4',
        fontSize: 11,
        fontWeight: 700,
        height: 38,
        textAlign: 'center',
        transition: 'all 0.18s ease',
        marginBottom: 4,
        borderRadius: 3,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        '&:hover': {
            background: `rgba(32,134,146,0.22)`,
            borderColor: '#208692',
            color: '#ffffff',
            boxShadow: '0 0 14px rgba(32,134,146,0.25)',
        },
    },
}));

export default ({ data }) => {
    const classes = useStyles();
    const onClick = () => {
        if (!data.options.disabled) {
            Nui.send('FrontEndSound', { sound: 'SELECT' });
            Nui.send('MenuOpen', {
                id: data.id,
            });
        }
    };

    const style = data.options.disabled ? { opacity: 0.5 } : {};
    return (
        <Button className={classes.div} style={style} onClick={onClick}>
            {data.label}
        </Button>
    );
};
