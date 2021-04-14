import * as actionTypes from "../actions/types";
import { combineReducers } from "redux"

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const initialChannel = {
    currentChannel: null
}
const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return ({
                currentUser: action.payload.currentUser,
                isLoading: false,
            })
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}



const channelReducer = (state = initialChannel, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return ({
                ...state,
                currentChannel: action.payload.currentChannel,
            })
        default:
            return state
    }
}


export const rootReducers = combineReducers({
    user: userReducer,
    channel: channelReducer
})
