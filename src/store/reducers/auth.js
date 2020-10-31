import * as actionTypes from '../actions/actionTypes'


const initialState = {
    idToken: null,
    userId: null,
    isLogined: false,
    loading: false,
    error: null,
}


const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_REGISTRATION_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.USER_REGISTERED_FAIL:
            return {
                ...state,
                error: action.error,


                loading: false,
            }
        case actionTypes.USER_REGISTERED_SUCCES:
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                loading: false,
                isLogined: !action.isLogined,
                error: null,
            };
        case actionTypes.USER_LOG_OUT:
            return {
                ...state,
                idToken: null,
                userId: null,
                isLogined: false,
            }
        case actionTypes.USER_LOGIN_SUCCES:
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                isLogined: !action.isLogined,
                loading: false,
                error: null,
            }



        default:
            return state
    }

}



export default auth