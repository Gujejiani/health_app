import * as actionTypes from './actionTypes'
import axios from 'axios'



export const registrationStart = () => {
    return {
        type: actionTypes.USER_REGISTRATION_START,

    }

}

export const logout = () => {
    return {
        type: actionTypes.USER_LOG_OUT
    }

}

export const registrationFail = (error) => {
    return {
        type: actionTypes.USER_REGISTERED_FAIL,
        error: error
    }
}

export const registrationSucces = (idToken, userId, isLogined) => {
    return {
        type: actionTypes.USER_REGISTERED_SUCCES,
        idToken: idToken,
        userId: userId,
        isLogined: isLogined
    }
}




export const auth = (email, password, isLogined, userInfo) => {
    return dispatch => {

        const authData = {
            email: email,
            password: password,

        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtcZLSWw_TZoY8QK4JGl1bx-9cBg-TBHA'

        // if(!isLogined){
        //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtcZLSWw_TZoY8QK4JGl1bx-9cBg-TBHA'
        // }

        axios.post(url, authData).then(response => {
            dispatch(registrationSucces(response.data.idToken, response.data.localId, isLogined))
            console.log(response)
            localStorage.setItem('userInfo', JSON.stringify(userInfo))

        })
            .catch(error => {
                dispatch(registrationFail(error.response.data.error.message))

            })

    }



}


export const loginSucces = (idToken, userId, isLogined) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCES,
        idToken: idToken,
        userId: userId,
        isLogined: isLogined
    }
}

export const login = (email, password, isLogined) => {
    return dispatch => {

        const authData = {
            email: email,
            password: password,

        }




        // if(!isLogined){
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtcZLSWw_TZoY8QK4JGl1bx-9cBg-TBHA'


        axios.post(url, authData).then(response => {
            dispatch(loginSucces(response.data.idToken, response.data.localId, isLogined))
            console.log(response)

        })
            .catch(error => {
                dispatch(registrationFail(error.response.data.error.message))
            })

    }

}
