import ActionTypes from "../constants/ActionTypes";

export const loadTheme = () => ({
    type : ActionTypes.LOAD_THEME
});

export const setLightTheme = () => ({
    type : ActionTypes.LIGHT_THEME
});

export const setDarkTheme = () => ({
    type : ActionTypes.DARK_THEME
});