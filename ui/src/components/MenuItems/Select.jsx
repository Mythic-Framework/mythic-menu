import React from 'react';
import { TextField, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Nui from '../../util/Nui';

const useStyles = makeStyles(theme => ({
    div: {
        border: `1px solid rgba(32,134,146,0.2)`,
        background: 'rgba(32,134,146,0.04)',
        color: theme.palette.text.main,
        fontSize: 13,
        minHeight: 72,
        width: '100%',
        textAlign: 'left',
        userSelect: 'none',
        marginBottom: 4,
        borderRadius: 3,
        padding: '10px 14px 8px',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        '&:focus-within': {
            borderColor: 'rgba(32,134,146,0.55)',
            background: 'rgba(32,134,146,0.07)',
        },
    },
    item: {
        width: '100%',
        textAlign: 'left',
    },
}));

export default ({ data }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(data.options.current);

    const handleChange = event => {
        setValue(event.target.value);
        Nui.send('Selected', {
            id: data.id,
            data: { value: event.target.value },
        });
    };

    const cssClass = data.options.disabled
        ? `${classes.div} disabled`
        : classes.div;
    const style = data.options.disabled ? { opacity: 0.5 } : {};

    return (
        <div className={cssClass} style={style}>
            <TextField
                variant="standard"
                className={classes.item}
                select
                disabled={data.options.disabled}
                label={data.label}
                value={value}
                onChange={handleChange}
            >
                {data.options.list.map(option => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        selected={false}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};
