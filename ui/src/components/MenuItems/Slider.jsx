import React, { useState } from 'react';
import Nui from '../../util/Nui';
import {
    Slider as MSlider,
    Tooltip,
    Grid,
    useTheme,
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { withStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    div: {
        border: `1px solid rgba(32,134,146,0.2)`,
        background: 'rgba(32,134,146,0.04)',
        color: theme.palette.text.main,
        fontSize: 13,
        minHeight: 80,
        width: '100%',
        textAlign: 'center',
        userSelect: 'none',
        padding: '10px 16px 6px',
        marginBottom: 4,
        borderRadius: 3,
    },
    label: {
        display: 'block',
        width: '100%',
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(32,134,146,0.7)',
        marginBottom: 2,
    },
    slider: {
        display: 'block',
        position: 'relative',
        top: '25%',
    },
    saveContainer: {
        textAlign: 'right',
        color: `rgba(32,134,146,0.5)`,
        cursor: 'pointer',
        '&:hover': {
            color: '#208692',
        },
    },
    icon: {
        width: '0.75em',
        height: '100%',
        fontSize: '1.25rem',
        float: 'right',
    },
}));

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const XSlider = withStyles(theme => ({
    color: '#208692',
    height: 8,
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &.Mui-active': {
            boxShadow: 'inherit',
        },
    },
    '& .MuiSlider-valueLabel': {
        left: 'calc(-50% + 4px)',
    },
    '& .MuiSlider-track': {
        height: 8,
        borderRadius: 4,
    },
    '& .MuiSlider-rail': {
        height: 8,
        borderRadius: 4,
    },
}))(MSlider);

export default ({ data }) => {
    const classes = useStyles();

    const [currValue, setCurrValue] = useState(data.options.current);
    const [savedValue, setSavedValue] = useState(currValue);

    const onChange = (event, newValue) => {
        if (!data.disabled) {
            setCurrValue(newValue);
        }
    };

    const onSave = () => {
        if (!data.disabled && currValue != savedValue) {
            setSavedValue(currValue);
            Nui.send('FrontEndSound', { sound: 'SELECT' });
            Nui.send('Selected', {
                id: data.id,
                data: { value: currValue },
            });
        }
    };

    var cssClass = data.options.disabled
        ? `${classes.div} disabled`
        : classes.div;
    var style = data.options.disabled ? { opacity: 0.5 } : {};

    return (
        <div className={cssClass} style={style}>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <span className={classes.label}>{data.label}</span>
                </Grid>
                <Grid
                    item
                    xs={2}
                    className={classes.saveContainer}
                    onClick={onSave}
                >
                    {currValue == savedValue ? null : (
                        <CheckCircle className={classes.icon} />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <XSlider
                        valueLabelDisplay="auto"
                        className={classes.slider}
                        onChange={onChange}
                        components={{
                            ValueLabel: ValueLabelComponent,
                        }}
                        defaultValue={0}
                        value={currValue}
                        step={data.options.step != null ? data.options.step : 1}
                        min={data.options.min}
                        max={data.options.max}
                        component="div"
                    />
                </Grid>
            </Grid>
        </div>
    );
};
