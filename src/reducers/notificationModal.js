import ActionTypes from '../constants/ActionTypes';


const initialState = {
    active : false
};

export default (state = initialState, {type}) => {
    switch(type) {
        case ActionTypes. NOTIFICATIONMODAL_ACTIVE : {
            return {
                active : true
            }
        }
        case ActionTypes.NOTIFICATIONMODAL_INACTIVE : {
            return {
                active : false
            }
        }
        default : 
        return state;
    }
}