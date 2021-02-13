import * as fromAuthActions from '../actions/auth-actions'

export interface State {
    id:number
    token:string
    role:string,
    expiresAtDate:any
    info:string
}

const initialState = {
    id:0,
    token:null,
    role:"MEM",
    expiresAtDate:null,
    info:"null"
}

export function authReducer (
    state:State = initialState,
    action:any
){
    switch (action.type){
        case fromAuthActions.SEND_INFO:
            return {...state,info:action.payload}
        case fromAuthActions.DELETE_INFO:
            return {...state,info:'null'}
        case fromAuthActions.REGIST_START:
            return state
        case fromAuthActions.LOGIN_START:
            return state
        case fromAuthActions.AUTO_LOGIN:
            return state
        case fromAuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                id:action.payload["id"],
                token:action.payload["token"],
                expiresAtDate:action.payload["expiresAtDate"],
                errorMessage:"",
                role:action.payload["role"]
            }
        case fromAuthActions.LOGOUT_START:
            return {...state,id:0,token:null,expiresAtDate:null,info:"null"}
        default:
            return state
    }
}