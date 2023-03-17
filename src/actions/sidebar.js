import ActionTypes from "../constants/ActionTypes"

export const collapseSidebar = () => ({
    type : ActionTypes.SIDEBAR_INACTIVE
});

export const expandSidebar = () => ({
    type : ActionTypes.SIDEBAR_ACTIVE
})