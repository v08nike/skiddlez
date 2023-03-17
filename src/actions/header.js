import ActionTypes from "../constants/ActionTypes"

export const collapseHeader = () => ({
    type : ActionTypes.HEADER_INACTIVE
});

export const expandHeader = () => ({
    type : ActionTypes.HEADER_ACTIVE
})