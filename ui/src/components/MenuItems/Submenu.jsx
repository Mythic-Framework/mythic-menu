import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Nui from '../../util/Nui';

const useStyles = makeStyles(theme => ({
    div: {
        width: '100%',
        border: `1px solid ${theme.palette.primary.main}40`,
        background: `${theme.palette.primary.main}12`,
        color: theme.palette.primary.light,
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
            background: `${theme.palette.primary.main}25`,
            borderColor: theme.palette.primary.main,
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
