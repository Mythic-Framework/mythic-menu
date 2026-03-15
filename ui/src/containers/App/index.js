import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    ThemeProvider,
    createTheme,
    StyledEngineProvider,
} from '@material-ui/core';
import Menu from '../../components/Menu/Menu';
import { useSelector } from 'react-redux';

export default () => {
    const hidden = useSelector(state => state.app.hidden);

    const muiTheme = createTheme({
        typography: {
            fontFamily: ['Oswald'],
        },
        palette: {
			primary: {
			main: '#208692',
			light: '#4db8c4',
			dark: '#0e5a62',
			contrastText: '#ffffff',
			},
			secondary: {
			main: '#121025',
			light: '#1c1a30',
			dark: '#0a0914',
			contrastText: '#ffffff',
			},
			error: {
			main: '#6e1616',
			light: '#a13434',
			dark: '#430b0b',
			},
			success: {
			main: '#208692',
			light: '#4db8c4',
			dark: '#0e5a62',
			},
			warning: {
				main: '#f09348',
				light: '#f2b583',
				dark: '#b05d1a',
			},
			info: {
				main: '#247ba5',
				light: '#247ba5',
				dark: '#175878',
			},
            text: {
                main: '#ffffff',
                alt: 'rgba(255,255,255,0.7)',
                light: '#000000',
                dark: '#cecece',
            },
            border: {
                main: '#e0e0e008',
                light: '#ffffff',
                dark: '#26292d',
                input: 'rgba(255, 255, 255, 0.23)',
                divider: '#2a2a2a',
				item: 'rgb(255, 255, 255)'
            },
            mode: 'dark',
        },
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        fontSize: 13,
                        backgroundColor: 'rgba(10, 9, 20, 0.97)',
                        border: '1px solid rgba(32,134,146,0.35)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                        borderRadius: 4,
                        letterSpacing: '0.03em',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        background: 'rgba(18, 16, 37, 0.97)',
                        backgroundImage: 'none',
                        border: '1px solid rgba(32,134,146,0.2)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': { background: 'rgba(32,134,146,0.1)' },
                        '&.Mui-selected': {
                            background: 'rgba(32,134,146,0.2)',
                            color: '#208692',
                            '&:hover': { background: 'rgba(32,134,146,0.25)' },
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&:before': {
                            borderBottomColor: 'rgba(32,134,146,0.3)',
                        },
                        '&:hover:not(.Mui-disabled):before': {
                            borderBottomColor: 'rgba(32,134,146,0.6)',
                        },
                        '&:after': {
                            borderBottomColor: '#208692',
                        },
                    },
                    input: {
                        color: '#ffffff',
                        fontSize: 13,
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: 'rgba(32,134,146,0.7)',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        '&.Mui-focused': {
                            color: '#208692',
                        },
                    },
                },
            },
            MuiSlider: {
                styleOverrides: {
                    root: {
                        color: '#208692',
                    },
                    thumb: {
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: '0 0 0 8px rgba(32,134,146,0.16)',
                        },
                    },
                    track: {
                        background: 'linear-gradient(90deg, #0e5a62, #208692)',
                        border: 'none',
                    },
                    rail: {
                        backgroundColor: 'rgba(32,134,146,0.2)',
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: 'rgba(32,134,146,0.5)',
                        '&.Mui-checked': {
                            color: '#208692',
                        },
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        '*::-webkit-scrollbar': { width: '4px' },
                        '*::-webkit-scrollbar-track': { background: 'transparent' },
                        '*::-webkit-scrollbar-thumb': { background: 'rgba(32,134,146,0.3)', borderRadius: '2px' },
                        '*::-webkit-scrollbar-thumb:hover': { background: 'rgba(32,134,146,0.55)' },
                        '.fade-enter': { opacity: 0 },
                        '.fade-exit': { opacity: 1 },
                        '.fade-enter-active': { opacity: 1 },
                        '.fade-exit-active': { opacity: 0 },
                        '.fade-enter-active, .fade-exit-active': { transition: 'opacity 500ms' },
                    },
                },
            },
        },
    });
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <div hidden={hidden}>
                    <Menu />
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
