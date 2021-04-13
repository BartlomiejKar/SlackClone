import * as actionTypes from "../actions/types";
import { combineReducers } from "redux"

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return ({
                currentUser: action.payload.currentUser,
                isLoading: false,
            })
        default:
            return state
    }
}

export const rootReducers = combineReducers({
    user: userReducer
})
