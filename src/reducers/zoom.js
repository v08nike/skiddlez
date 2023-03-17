import ActionTypes from "../constants/ActionTypes";

const initialState = {
    zoom : false
};


export default (state = initialState, {type}) => {
    switch(type) {
        case ActionTypes.ZOOM_IN : {
            return {
                zoom : true
            }
        }
        case ActionTypes.ZOOM_OUT : {
            return {
                zoom : false
            }
        }
        default : 
        return state;
    }
}