import ActionTypes from "../constants/ActionTypes"

export const notificationmodalClose = () => ({
    type : ActionTypes.NOTIFICATIONMODAL_INACTIVE
});

export const notificationmodalOpen = () => ({
    type : ActionTypes.NOTIFICATIONMODAL_ACTIVE
})