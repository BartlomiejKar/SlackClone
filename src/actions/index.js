import * as actionTypes from "./types"

export const setUser = (user) => {
    console.log(user.uid)
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user,
        }
    }
}