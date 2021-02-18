import { Action } from "@ngrx/store"

export const ACC_INSERT_START = '[ACC] ACC_INSERT_START'
export const ACC_SEND_INFO = '[ACC] ACC_SEND_INFO'
export const ACC_DESTROY_INFO = '[ACC] ACC_DESTROY_INFO'

export class AccInsert implements Action{
  type: string = ACC_INSERT_START;

  constructor(public payload:{subject:string,debit:Number,kredit:Number,ket:string}){}
}

export class AccSendInfo implements Action{
  type: string = ACC_SEND_INFO;

  constructor(public payload:string){}
}

export class AccDestroyInfo implements Action{
  type: string = ACC_DESTROY_INFO;

  constructor(){}
}
