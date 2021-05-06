import * as actionTypes from "../actions/types";
import { combineReducers } from "redux"

const initialUserState = {
    currentUser: null,
    isLoading: true,
    userPosts: null
}

const initialChannel = {
    currentChannel: null
}

// const initialPrivateChannel = {
//     private: true
// }
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
        case actionTypes.SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload.userPosts
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


// const privateChannel = (state = initialPrivateChannel, action) => {
//     switch (action.type) {
//         case actionTypes.PRIVATE:
//             return ({
//                 private: action.payload.private
//             })
//         default:
//             return state
//     }
// }

export const rootReducers = combineReducers({
    user: userReducer,
    channel: channelReducer,
    // private: privateChannel
})
