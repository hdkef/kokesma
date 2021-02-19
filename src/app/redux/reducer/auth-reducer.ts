import * as fromAuthActions from '../actions/auth-actions'

export interface State {
    id:number
    nama:string
    nim:string
    rumah:string
    token:string
    role:string,
    expiresAtDate:any
    info:string
    load:boolean
}

const initialState = {
    id:0,
    nama:"",
    nim:"",
    rumah:"",
    token:null,
    role:"MEM",
    expiresAtDate:null,
    info:"null",
    load:false
}

export function authReducer (
    state:State = initialState,
    action:any
){
    switch (action.type){
        case fromAuthActions.SEND_INFO:
            return {...state,info:action.payload,load:false}
        case fromAuthActions.DELETE_INFO:
            return {...state,info:'null',load:false}
        case fromAuthActions.REGIST_START:
            return {...state,load:true}
        case fromAuthActions.LOGIN_START:
            return {...state,load:true}
        case fromAuthActions.AUTO_LOGIN:
            return state
        case fromAuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                id:action.payload["id"],
                nama:action.payload["nama"],
                rumah:action.payload["rumah"],
                nim:action.payload["nim"],
                token:action.payload["token"],
                expiresAtDate:action.payload["expiresAtDate"],
                errorMessage:"",
                role:action.payload["role"],
                load:false
            }
        case fromAuthActions.LOGOUT_START:
            return {...state,id:0,rumah:null,nama:null,nim:null,token:null,expiresAtDate:null,info:"null",role:"MEM"}
        default:
            return state
    }
}
