import React, { useState } from 'react';
import { Grid, Fade, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Nui from '../../util/Nui';

const useStyles = makeStyles(theme => ({
    div: {
        border: `1px solid rgba(32,134,146,0.2)`,
        background: 'rgba(32,134,146,0.05)',
        color: 'rgba(255,255,255,0.85)',
        fontSize: 13,
        height: 42,
        width: '100%',
        textAlign: 'center',
        userSelect: 'none',
        transition: 'all 0.18s ease',
        marginBottom: 4,
        borderRadius: 3,
        '&:hover': {
            background: 'rgba(32,134,146,0.12)',
            borderColor: 'rgba(32,134,146,0.5)',
            filter: 'none',
        },
    },
    preview: {
        width: 60,
        height: 25,
        border: `1px solid rgba(255,255,255,0.3)`,
        borderRadius: 2,
        transition: 'background 0.15s',
    },
    colorButton: {
        width: '100%',
        display: 'block',
        height: 42,
        fontSize: 13,
        padding: '0 10px',
        fontWeight: 500,
        textAlign: 'center',
        textDecoration: 'none',
        textShadow: 'none',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        borderRadius: 3,
        transition: '0.18s all ease',
        userSelect: 'none',
        marginBottom: 4,
        border: `1px solid rgba(32,134,146,0.2)`,
        background: 'rgba(32,134,146,0.05)',
        color: 'rgba(255,255,255,0.85)',
        '&:hover': {
            background: 'rgba(32,134,146,0.15)',
            borderColor: 'rgba(32,134,146,0.5)',
            cursor: 'pointer',
        },
    },
}));

export default ({ data }) => {
    const classes = useStyles();
    const [showList, setShowList] = useState(false);
    const [selectedColor, setSelectedColor] = useState(
        data.options.colors[data.options.current],
    );

    const onClick = () => {
        if (!data.options.disabled) {
            setShowList(!showList);
        }
    };

    const changeColor = index => {
        setSelectedColor(data.options.colors[index]);
		setShowList(!showList);
        Nui.send('Selected', {
            id: data.id,
            data: { color: data.options.colors[index] },
        });
    };

    const cssClass = data.options.disabled
        ? `${classes.div} disabled`
        : `${classes.div}${showList ? ' open' : ''}`;
    const style = data.options.disabled ? { opacity: 0.5 } : {};

    return (
        <div>
            <Button className={cssClass} style={style} onClick={onClick}>
                <Grid
                    container
                    style={{
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <Grid item xs={2}>
                        <div
                            className={classes.preview}
                            style={{
                                background:
                                    selectedColor.rgb != null
                                        ? `rgb(${selectedColor.rgb.r}, ${selectedColor.rgb.g}, ${selectedColor.rgb.b})`
                                        : selectedColor.hex,
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <span style={{ textShadow: '2px 2px #000' }}>
                            {selectedColor.label}
                        </span>
                    </Grid>
                </Grid>
            </Button>
            <Dialog fullWidth onClose={onClick} open={showList}>
                <DialogTitle onClose={onClick}>
                    Select Color
                </DialogTitle>
                <DialogContent dividers>
                {data.options.colors.map(function(color, i) {
                    return (
                        <div
                            className={classes.colorButton}
                            key={i}
                            onClick={() => {
                                changeColor(i);
                            }}
                        >
                            <Grid
                                container
                                style={{
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                <Grid item xs={2}>
                                    <div
                                        className={classes.preview}
                                        style={{
                                            background:
                                                color.rgb != null
                                                    ? `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
                                                    : color.hex,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <span
                                        style={{
                                            textShadow: '2px 2px #000',
                                        }}
                                    >
                                        {color.label}
                                    </span>
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                        </div>
                    );
                })}
                </DialogContent>
            </Dialog>
        </div>
    );
};
