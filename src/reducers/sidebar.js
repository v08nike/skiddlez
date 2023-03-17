import ActionTypes from '../constants/ActionTypes';


const initialState = {
    active : true
};

export default (state = initialState, {type}) => {
    switch(type) {
        case ActionTypes.SIDEBAR_ACTIVE : {
            return {
                active : true
            }
        }
        case ActionTypes.SIDEBAR_INACTIVE : {
            return {
                active : false
            }
        }
        default : 
        return state;
    }
}