import firebase from "firebase"

export const isFormEmpty = ({
    userName,
    email,
    password,
    passwordConfirm
}) => {
    return !userName.length || !email.length || !password.length || !passwordConfirm.length

}

export const isPasswordValid = ({ password, passwordConfirm }) => {
    if (password.length < 6 || passwordConfirm < 6) {
        return false
    } else if (password !== passwordConfirm) {
        return false
    }
    else {
        return true
    }

}

export const saveProfile = (createdUser) => {
    const usersRef = firebase.database().ref("users")
    return usersRef.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL
    })
}

