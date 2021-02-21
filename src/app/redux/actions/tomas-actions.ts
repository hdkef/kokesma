import { Action } from "@ngrx/store"
import { Tomas } from "src/app/model/tomas"

export const TOMAS_ADM_INIT = "[Tomas] TOMAS_ADM_INIT"
export const TOMAS_ADM_SUCCESS = "[Tomas] TOMAS_ADM_SUCCESS"
export const TOMAS_ADD_ITEM = "[Tomas] TOMAS_ADD_ITEM"
export const TOMAS_ADD_MEMTOMAS = "[Tomas] TOMAS_ADD_MEMTOMAS"
export const TOMAS_SEND_INFO = "[Tomas] TOMAS_SEND_INFO"
export const TOMAS_ADD_ADMTOMAS = "[Tomas] TOMAS_ADD_ADMTOMAS"
export const TOMAS_MEM_INIT_CURSTOCK = "[Tomas] TOMAS_MEM_INIT_CURSTOCK"
export const TOMAS_MEM_SUCCESS_CURSTOCK = "[Tomas] TOMAS_MEM_SUCCESS_CURSTOCK"
export const TOMAS_MEM_INIT_JOURNAL = "[Tomas] TOMAS_MEM_INIT_JOURNAL"
export const TOMAS_MEM_SUCCESS_JOURNAL = "[Tomas] TOMAS_MEM_SUCCESS_JOURNAL"
export const TOMAS_ADM_MONITOR = "[Tomas] TOMAS_ADM_MONITOR"
export const TOMAS_ADM_MONITOR_SUCCESS = "[Tomas] TOMAS_ADM_MONITOR_SUCCESS"
export const TOMAS_ADM_BACKUPRESET = "[Tomas] TOMAS_ADM_BACKUPRESET"
export const TOMAS_DELETE_INFO = "[Tomas] TOMAS_DELETE_INFO"


export class TomasDeleteInfo implements Action{
    readonly type: string = TOMAS_DELETE_INFO
    constructor(){}
}

export class TomasAdmBackupReset implements Action{
    readonly type: string = TOMAS_ADM_BACKUPRESET
    constructor(){}
}

export class TomasAdmMonitor implements Action{
    readonly type: string = TOMAS_ADM_MONITOR
    constructor(public payload:string){}
}

export class TomasAdmMonitorSuccess implements Action{
    readonly type: string = TOMAS_ADM_MONITOR_SUCCESS
    constructor(public payload:{monuser:string[],monjournal:Tomas[],moncurstock:Tomas[],monstocklist:Tomas[],sum:Number}){}
}

export class TomasMemInitCurstock implements Action{
    readonly type: string = TOMAS_MEM_INIT_CURSTOCK
    constructor(){}
}

export class TomasMemSuccessCustock implements Action{
    readonly type: string = TOMAS_MEM_SUCCESS_CURSTOCK
    constructor(public payload:Tomas[]){}
}

export class TomasMemInitJournal implements Action{
  readonly type: string = TOMAS_MEM_INIT_JOURNAL
  constructor(){}
}

export class TomasMemSuccessJournal implements Action{
  readonly type: string = TOMAS_MEM_SUCCESS_JOURNAL
  constructor(public payload:Tomas[]){}
}

export class TomasAddAdmTomas implements Action{
    readonly type: string = TOMAS_ADD_ADMTOMAS
    constructor(public payload:string){}
}

export class TomasAddMemTomas implements Action{
    readonly type: string = TOMAS_ADD_MEMTOMAS
    constructor(public payload:any){}
}

export class TomasSendInfo implements Action{
    readonly type: string = TOMAS_SEND_INFO
    constructor(public payload:string){}
}

export class TomasAdmInit implements Action{
    readonly type: string = TOMAS_ADM_INIT
    constructor(){}
}

export class TomasAdmSuccess implements Action{
    readonly type: string = TOMAS_ADM_SUCCESS
    constructor(public payload:{admHome:string[],admItemOptions:any}){}
}

export class TomasAddItem implements Action{
    readonly type: string = TOMAS_ADD_ITEM
    constructor(public payload:{Nama:string,Harga:any,Image:string}){}
}

