import { Action } from "@ngrx/store"

export const LOGIN_START = "[Auth] LOGIN_START"
export const LOGIN_SUCCESS = "[Auth] LOGIN_SUCCESS"
export const LOGOUT_START = "[Auth] LOGOUT_START"
export const AUTO_LOGIN = "[Auth] AUTO_LOGIN"
export const REGIST_START = "[Auth] REGIST_START"
export const SEND_INFO = "[Auth] SEND_INFO"
export const DELETE_INFO = "[Auth] DELETE_INFO"

export class DeleteInfo implements Action{
    readonly type: string = DELETE_INFO
    constructor(){}
}

export class SendInfo implements Action{
    readonly type: string = SEND_INFO
    constructor(public payload:string){}
}

export class RegistStart implements Action{
    readonly type: string = REGIST_START
    constructor(public payload:{Rumah:string,Nama:string,NIM:Number,Password:string,Role:string,Invit:string}){}
}

export class LoginStart implements Action{
    readonly type: string = LOGIN_START
    constructor(public payload:{nim:string,password:string,role:string}){}
}

export class LoginSuccess implements Action{
    readonly type: string = LOGIN_SUCCESS
    constructor(public payload:{id:number,token:string,expiresAtDate:any,role:string,nama:string,nim:string,rumah:string}){}
}

export class LogoutStart implements Action{
    readonly type: string = LOGOUT_START
    constructor(){}
}

export class AutoLogin implements Action{
    readonly type: string = AUTO_LOGIN
    constructor(){}
}
