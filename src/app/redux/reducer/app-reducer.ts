import { ActionReducerMap } from '@ngrx/store'
import * as fromTomas from './tomas-reducer'
import * as fromAuth from './auth-reducer'

export interface AppState {
    tomas: fromTomas.State
    auth:fromAuth.State
}

export const appReducer : ActionReducerMap<AppState> = {
    tomas:fromTomas.tomasReducer,
    auth:fromAuth.authReducer,
}