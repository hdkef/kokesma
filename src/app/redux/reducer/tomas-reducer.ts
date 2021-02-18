import { Tomas } from 'src/app/model/tomas'
import * as fromTomasActions from '../actions/tomas-actions'

export interface State {
    journal:Tomas[],
    curstocklist:Tomas[],
    admHome:string[],
    admItemsName:string[],
    admItemsID:any[],
    info:string,
    monuser:string[],
    monjournal:Tomas[],
    moncurstock:Tomas[],
    monstocklist:Tomas[],
    sum:Number,
}

const initialState = {
    journal:null,
    curstocklist:null,
    admHome:null,
    admItemsName:null,
    admItemsID:null,
    info:"null",
    monuser:null,
    monjournal:null,
    moncurstock:null,
    monstocklist:null,
    sum:null,
}

export function tomasReducer (
    state:State = initialState,
    action:any
){
    switch(action.type){
        // case fromTomasActions.TOMAS_ADM_CURSTOCK:
        //     return state
        // case fromTomasActions.TOMAS_ADM_CURSTOCK_SUCCESS:
        //     return {
        //         ...state,
        //         curstocklist:action.payload["curstock"]
        //     }
        // case fromTomasActions.TOMAS_MEM_JOURNAL:
        //     return state
        // case fromTomasActions.TOMAS_MEM_JOURNAL_SUCCESS:
        //     return {
        //         ...state,
        //         journal:action.payload["journal"]
        //     }
        case  fromTomasActions.TOMAS_DELETE_INFO:
            return {...state,info:"null"}
        case fromTomasActions.TOMAS_ADM_BACKUPRESET:
            return state
        case fromTomasActions.TOMAS_ADM_MONITOR:
            return state
        case fromTomasActions.TOMAS_ADM_MONITOR_SUCCESS:
            return {
                ...state,
                monuser:action.payload["monuser"],
                monjournal:action.payload["monjournal"],
                moncurstock:action.payload["moncurstock"],
                monstocklist:action.payload["monstocklist"],
                sum:action.payload["sum"]
            }
        case fromTomasActions.TOMAS_MEM_INIT:
            return state
        case fromTomasActions.TOMAS_MEM_SUCCESS:
            return {...state,
            curstocklist:action.payload["curstock"],
            journal:action.payload["journal"]
        }
        case fromTomasActions.TOMAS_ADM_INIT:
            return state
        case fromTomasActions.TOMAS_ADM_SUCCESS:
            return {
                ...state,
                admHome:action.payload["admHome"],
                admItemsName:action.payload["admItemName"],
                admItemsID:action.payload["admItemID"],
            }
        case fromTomasActions.TOMAS_ADD_ITEM:
            return state
        case fromTomasActions.TomasSendInfo:
            return {
                ...state,
                info:action.payload
            }
        case fromTomasActions.TOMAS_ADD_MEMTOMAS:
            return state
        case fromTomasActions.TOMAS_ADD_ADMTOMAS:
            return state
        case fromTomasActions.TOMAS_SEND_INFO:
            return {...state,info:action.payload}
        default:
            return state
    }
}
