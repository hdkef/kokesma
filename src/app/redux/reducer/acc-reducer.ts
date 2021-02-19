import { Acc } from "src/app/model/acc";
import * as fromAccActions from '../actions/acc-actions'

export interface State {
  acc_journal:Acc[]
  info:string
  load:boolean
}

const initialState = {
  acc_journal:null,
  info:"null",
  load:false
}

export function AccReducer (
  state:State = initialState,
  action:any
){
  switch (action.type){

    case fromAccActions.ACC_JOURNAL_START:
      return {...state,load:true}

    case fromAccActions.ACC_JOURNAL_SUCCESS:
      return {...state,acc_journal:action.payload,load:false}

    case fromAccActions.ACC_INSERT_START:
      return {...state,load:true}

    case fromAccActions.ACC_SEND_INFO:
      return {...state,info:action.payload,load:false}

    case fromAccActions.ACC_DESTROY_INFO:
      return {...state,info:"null",load:false}

    default:
      return state
  }

}
