import { Action } from "@ngrx/store"
import { Acc } from "src/app/model/acc"

export const ACC_INSERT_START = '[ACC] ACC_INSERT_START'
export const ACC_SEND_INFO = '[ACC] ACC_SEND_INFO'
export const ACC_DESTROY_INFO = '[ACC] ACC_DESTROY_INFO'
export const ACC_JOURNAL_START = '[ACC] ACC_JOURNAL_START'
export const ACC_JOURNAL_SUCCESS = '[ACC] ACC_JOURNAL_SUCCESS'


export class AccJournalStart implements Action{
  type: string = ACC_JOURNAL_START
  constructor(public payload:{FDate:string,SDate:string}){}
}

export class AccJournalSuccess implements Action{
  type: string = ACC_JOURNAL_SUCCESS
  constructor(public payload:any){}
}

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
