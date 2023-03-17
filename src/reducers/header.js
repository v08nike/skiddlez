import ActionTypes from '../constants/ActionTypes';


const initialState = {
    active : true
};

export default (state = initialState, {type}) => {
    switch(type) {
        case ActionTypes.HEADER_ACTIVE : {
            return {
                active : true
            }
        }
        case ActionTypes.HEADER_INACTIVE : {
            return {
                active : false
            }
        }
        default : 
        return state;
    }
}