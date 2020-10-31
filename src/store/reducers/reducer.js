import * as actionTypes from '../actions/actionTypes'

const initialState ={
    userInfo: {
            name: null,
            email: null,
            password: null,
            weight: null,
            meal: null,
            activity: null

    },
  
    
}

const reducer  = (state = initialState, action)=>{
        switch (action.type) {
            case actionTypes.REGISTRATION_COMMIT:
                return{
                    ...state,
                    userInfo: action.userInfo
                }
              
        
            default:
               return{
                   ...state
               }
        }
}


export default reducer
