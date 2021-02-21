import { Tomas } from 'src/app/model/tomas'
import * as fromTomasActions from '../actions/tomas-actions'

export interface State {
    journal:Tomas[],
    curstocklist:Tomas[],
    admHome:string[],
    admItemOptions:Tomas[],
    info:string,
    monuser:string[],
    monjournal:Tomas[],
    moncurstock:Tomas[],
    monstocklist:Tomas[],
    sum:Number,
    load:boolean
}

const initialState = {
    journal:null,
    curstocklist:null,
    admHome:null,
    admItemOptions:null,
    info:"null",
    monuser:null,
    monjournal:null,
    moncurstock:null,
    monstocklist:null,
    sum:null,
    load:false
}

export function tomasReducer (
    state:State = initialState,
    action:any
){
    switch(action.type){
      case  fromTomasActions.TOMAS_ADD_ADMTOMAS:
            return {...state,load:true}
        case  fromTomasActions.TOMAS_DELETE_INFO:
            return {...state,info:"null",load:false}
        case fromTomasActions.TOMAS_ADM_BACKUPRESET:
            return {...state,load:true}
        case fromTomasActions.TOMAS_ADM_MONITOR:
            return {...state,load:true}
        case fromTomasActions.TOMAS_ADM_MONITOR_SUCCESS:
            return {
                ...state,
                monuser:action.payload["monuser"],
                monjournal:action.payload["monjournal"],
                moncurstock:action.payload["moncurstock"],
                monstocklist:action.payload["monstocklist"],
                sum:action.payload["sum"],
                load:false
            }
        case fromTomasActions.TOMAS_MEM_INIT_CURSTOCK:
            return {...state,load:true}
        case fromTomasActions.TOMAS_MEM_SUCCESS_CURSTOCK:
            return {...state,
            curstocklist:action.payload,
            load:false,
        }
        case fromTomasActions.TOMAS_MEM_INIT_JOURNAL:
            return {...state,load:true}
        case fromTomasActions.TOMAS_MEM_SUCCESS_JOURNAL:
            return {...state,
            journal:action.payload,
            load:false
        }
        case fromTomasActions.TOMAS_ADM_INIT:
            return {...state,load:true}
        case fromTomasActions.TOMAS_ADM_SUCCESS:
            return {
                ...state,
                admHome:action.payload["admHome"],
                admItemOptions:action.payload["admItemOptions"],
                load:false
            }
        case fromTomasActions.TOMAS_ADD_ITEM:
            return {...state,load:true}
        case fromTomasActions.TOMAS_ADD_MEMTOMAS:
            return {...state,load:true}
        case fromTomasActions.TOMAS_SEND_INFO:
            return {...state,info:action.payload,load:false}
        default:
            return state
    }
}
