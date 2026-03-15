import Nui from '../../util/Nui';

export const initialState = {
    prevMenu: [],
    menu: {
        id: null, //'root',
        label: null, //'Test Menu',
        items: [
            // {
            //     type: 'COLORPICKER',
            //     label: 'Test',
            //     options: {
            //         disabled: false,
            //         current: { r: 0, g: 0, b: 0 },
            //         color: {
            //             [0]: { label: 'Black', r: 0, g: 0, b: 0 },
            //         },
            //     },
            // },
            // {
            //     type: 'COLORLIST',
            //     label: 'Test',
            //     options: {
            //         disabled: false,
            //         current: 0,
            //         colors: [
            //             { label: 'White', hex: '#fff' },
            //             {
            //                 label: 'Black',
            //                 rgb: { r: 0, g: 0, b: 0 },
            //                 hex: '#000',
            //             },
            //             { label: 'Red', rgb: { r: 255, g: 0, b: 0 } },
            //             { label: 'Green', rgb: { r: 0, g: 255, b: 0 } },
            //             { label: 'Blue', rgb: { r: 0, g: 0, b: 255 } },
            //             { label: 'White', hex: '#fff' },
            //             {
            //                 label: 'Black',
            //                 rgb: { r: 0, g: 0, b: 0 },
            //                 hex: '#000',
            //             },
            //             { label: 'Red', rgb: { r: 255, g: 0, b: 0 } },
            //             { label: 'Green', rgb: { r: 0, g: 255, b: 0 } },
            //             { label: 'Blue', rgb: { r: 0, g: 0, b: 255 } },
            //             { label: 'White', hex: '#fff' },
            //             {
            //                 label: 'Black',
            //                 rgb: { r: 0, g: 0, b: 0 },
            //                 hex: '#000',
            //             },
            //             { label: 'Red', rgb: { r: 255, g: 0, b: 0 } },
            //             { label: 'Green', rgb: { r: 0, g: 255, b: 0 } },
            //             { label: 'Blue', rgb: { r: 0, g: 0, b: 255 } },
            //             { label: 'White', hex: '#fff' },
            //             {
            //                 label: 'Black',
            //                 rgb: { r: 0, g: 0, b: 0 },
            //                 hex: '#000',
            //             },
            //             { label: 'Red', rgb: { r: 255, g: 0, b: 0 } },
            //             { label: 'Green', rgb: { r: 0, g: 255, b: 0 } },
            //             { label: 'Blue', rgb: { r: 0, g: 0, b: 255 } },
            //             { label: 'White', hex: '#fff' },
            //             {
            //                 label: 'Black',
            //                 rgb: { r: 0, g: 0, b: 0 },
            //                 hex: '#000',
            //             },
            //             { label: 'Red', rgb: { r: 255, g: 0, b: 0 } },
            //             { label: 'Green', rgb: { r: 0, g: 255, b: 0 } },
            //             { label: 'Blue', rgb: { r: 0, g: 0, b: 255 } },
            //         ],
            //     },
            // },
            // {
            //     type: 'TICKER',
            //     label: 'Test',
            //     options: {
            //         disabled: false,
            //         max: 10,
            //         current: 1,
            //     },
            // },
            // {
            //     type: 'SLIDER',
            //     label: 'Test',
            //     options: {
            //         disabled: false,
            //         current: 1,
            //         step: 1,
            //         min: 1,
            //         max: 20,
            //     },
            // },
        ],
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_MENU': {
            return {
                ...state,
                menu: {
                    id: null,
                    label: null,
                    items: [],
                },
                prevMenu: [],
            };
        }
        case 'SETUP_MENU':
            return {
                ...state,
                prevMenu: [],
                menu: action.payload.data,
            };
        case 'UPDATE_MENU':
            return {
                ...state,
                menu: action.payload.data,
            };
        case 'SUBMENU_OPEN': {
            if (action.payload.addHistroy) {
                var old = state.prevMenu;
                old.push(state.menu);

                return {
                    ...state,
                    prevMenu: old,
                    menu: action.payload.data,
                };
            } else {
                return {
                    ...state,
                    menu: action.payload.data,
                };
            }
        }
        case 'SUBMENU_BACK': {
            Nui.send('MenuClose', {
                id: state.menu.id,
            });

            if (state.prevMenu.length > 0) {
                Nui.send('MenuOpen', {
                    id: state.prevMenu[state.prevMenu.length - 1].id,
                    back: true,
                });
                return {
                    ...state,
                    prevMenu: state.prevMenu.filter(
                        (_, i) => i !== state.prevMenu.length - 1,
                    ),
                };
            } else {
                Nui.send('Close');
                return {
                    ...state,
                    menu: {
                        id: null,
                        label: null,
                        items: [],
                    },
                    prevMenu: [],
                };
            }
        }
        default:
            return state;
    }
};

export default reducer;
