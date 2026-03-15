import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Nui from '../../util/Nui';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    div: {
        width: '100%',
        border: `1px solid rgba(110,22,22,0.4)`,
        background: `rgba(67,11,11,0.3)`,
        color: '#a13434',
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
            background: `rgba(110,22,22,0.28)`,
            borderColor: '#6e1616',
            color: '#c44',
        },
    },
}));

export default ({ data }) => {
    const classes = useStyles();
	const dispatch = useDispatch();

    const onClick = () => {
        if (!data.options.disabled) {
            Nui.send('FrontEndSound', { sound: 'BACK' });
            Nui.send('Selected', {
                id: data.id,
            });

            dispatch({
                type: 'SUBMENU_BACK',
            });
        }
    };

    return (
        <Button className={classes.div} onClick={onClick}>
            {data.label}
        </Button>
    );
};
