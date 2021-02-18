import { Acc } from "src/app/model/acc";
import * as fromAccActions from '../actions/acc-actions'

export interface State {
  acc_journal:Acc[]
  info:string
}

const initialState = {
  acc_journal:null,
  info:"null"
}

export function AccReducer (
  state:State = initialState,
  action:any
){
  switch (action.type){

    case fromAccActions.ACC_INSERT_START:
      console.log("reducer insert")
      return state

    case fromAccActions.ACC_SEND_INFO:
      console.log('send info reducer')
      return {...state,info:action.payload}

    case fromAccActions.ACC_DESTROY_INFO:
      return {...state,info:"null"}

    default:
      return {...state,info:"null"}
  }

}
