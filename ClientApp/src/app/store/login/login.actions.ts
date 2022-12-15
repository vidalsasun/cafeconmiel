import { createAction, props } from "@ngrx/store";
import { reduxLoginModel } from "../../models/redux/login";

export const init = createAction('[Users page] Init');

export const loginUser = createAction('[Login page] login user',
  props<{ loginData: reduxLoginModel }>()
);

export const disconectUser = createAction('[Login page] disconect user',
  props<{ loginData: reduxLoginModel }>()
);
