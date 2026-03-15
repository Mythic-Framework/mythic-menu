/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
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
        padding: '10px 14px 8px',
        marginBottom: 5,
        borderRadius: 3,
        transition: 'border-color 0.2s ease, background 0.2s ease',
        '&:focus-within': {
            borderColor: 'rgba(32,134,146,0.55)',
            background: 'rgba(32,134,146,0.07)',
        },
    },
    input: {
        width: '100%',
        '& .MuiInput-underline:before': {
            borderBottomColor: 'rgba(32,134,146,0.3)',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'rgba(32,134,146,0.6)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#208692',
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(32,134,146,0.65)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#208692',
        },
        '& .MuiInputBase-input': {
            color: '#ffffff',
            fontSize: 13,
        },
    },
}));

export default ({ data }) => {
    const classes = useStyles();
    const [value, setValue] = useState(
        data.options.current == null ? '' : data.options.current,
    );

    const onChange = event => {
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
                label={data.label}
                disabled={data.options.disabled}
                value={value}
                onChange={onChange}
                className={classes.input}
                type="text"
                multiline
                inputProps={{
                    maxLength:
                        data.options.max != null ? data.options.max : 1024,
                }}
            />
        </div>
    );
};
