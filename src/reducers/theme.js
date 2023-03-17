import ActionTypes from "../constants/ActionTypes";

const initialState = {
    theme : 'bg-light'
};


export default (state = initialState, {type}) => {
    switch(type) {
        case ActionTypes.DARK_THEME : {
            localStorage.setItem('skiddlez-theme', 'bg-dark');
            return {
                theme : 'bg-dark'
            }
        }
        case ActionTypes.LIGHT_THEME : {
            localStorage.setItem('skiddlez-theme', 'bg-light');
            return {
                theme : 'bg-light'
            }
        }
        case ActionTypes.LOAD_THEME : {
            const selectedTheme = localStorage.getItem('skiddlez-theme');
            if(selectedTheme) {
                return {
                    theme : selectedTheme
                }
            } 
            localStorage.setItem('skiddlez-theme', 'bg-light');
            return {
                theme : 'bg-light'
            }
        }
        default : 
        return state;
    }
}