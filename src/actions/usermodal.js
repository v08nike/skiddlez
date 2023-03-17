import ActionTypes from "../constants/ActionTypes"

export const usermodalClose = () => ({
    type : ActionTypes.USERMODAL_INACTIVE
});

export const usermodalOpen = () => ({
    type : ActionTypes.USERMODAL_ACTIVE
})