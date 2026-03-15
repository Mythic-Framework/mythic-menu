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
				main: '#00c9b1',
				light: '#4ddece',
				dark: '#008c7c',
				contrastText: '#0a0a0a',
			},
			secondary: {
				main: '#141414',
				light: '#1c1c1c',
				dark: '#0f0f0f',
				contrastText: '#ffffff',
			},
			error: {
				main: '#e53935',
				light: '#ff6b6b',
				dark: '#b71c1c',
			},
			success: {
				main: '#00c9b1',
				light: '#4ddece',
				dark: '#007a6d',
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
                        fontSize: 16,
                        backgroundColor: '#111315',
                        border: '1px solid rgba(255, 255, 255, 0.23)',
                        boxShadow: `0 0 10px #000`,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        background: '#111315',
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        '.fade-enter': {
                            opacity: 0,
                        },
                        '.fade-exit': {
                            opacity: 1,
                        },
                        '.fade-enter-active': {
                            opacity: 1,
                        },
                        '.fade-exit-active': {
                            opacity: 0,
                        },
                        '.fade-enter-active, .fade-exit-active': {
                            transition: 'opacity 500ms',
                        },
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
