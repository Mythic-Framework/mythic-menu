import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Nui from '../../util/Nui';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    div: {
        width: '100%',
        border: `1px solid ${theme.palette.error.main}50`,
        background: `${theme.palette.error.dark}40`,
        color: theme.palette.error.light,
        fontSize: 13,
        fontWeight: 500,
        height: 40,
        textAlign: 'center',
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
