  import * as actionTypes from './actionTypes'

export const formSubmited =(userInfo)=>{
    return{
        type: actionTypes.REGISTRATION_COMMIT,
        userInfo: userInfo,
    }

    }
    