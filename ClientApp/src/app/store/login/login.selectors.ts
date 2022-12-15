import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loginState, loginStateFeatureKey } from "./login.reducer";

const usersState = createFeatureSelector<loginState>(loginStateFeatureKey);


export const token = createSelector(
  usersState,
  (usersState) => usersState.loginData
);
