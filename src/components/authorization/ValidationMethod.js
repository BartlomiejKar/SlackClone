
export const isFormEmpty = ({
    userName,
    userSurname,
    email,
    password,
    passwordConfirm
}) => {
    return !userName.length || !userSurname.length || !email.length || !password.length || !passwordConfirm.length

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

