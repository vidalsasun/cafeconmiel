import { createReducer, on } from "@ngrx/store";
import { LoginActions } from ".";
import { reduxLoginModel } from "../../models/redux/login";

export const loginStateFeatureKey = 'loginState'

export interface loginState {
  loginData: reduxLoginModel[];
}
const initialState: loginState = {
  loginData: [],
}
export const loginReducer = createReducer(
  initialState,
  on(    
    LoginActions.init,
    (currentState) => ({
      currentState,
      loginData: Array<reduxLoginModel>()
    })
  ),
  on(
    LoginActions.loginUser, (currentState, action) => ({
      currentState,
      loginData: [...currentState.loginData, action.loginData]
    })
  ),
  on(
    LoginActions.disconectUser, (currentState, action) => ({
      currentState,
      loginData: new Array<reduxLoginModel>()
    })
  ),


)


