export const initialState = {
    hidden: true,

    // DEV PREVIEW - uncomment to preview in browser
    // hidden: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APP_SHOW':
            return {
                ...state,
                hidden: false,
            };
        case 'APP_HIDE':
            return {
                ...state,
                hidden: true,
            };
        default:
            return state;
    }
};

export default appReducer;
