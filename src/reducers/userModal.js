import ActionTypes from '../constants/ActionTypes';


const initialState = {
    active : false
};

export default (state = initialState, {type}) => {
    switch(type) {
        case ActionTypes. USERMODAL_ACTIVE : {
            return {
                active : true
            }
        }
        case ActionTypes.USERMODAL_INACTIVE : {
            return {
                active : false
            }
        }
        default : 
        return state;
    }
}