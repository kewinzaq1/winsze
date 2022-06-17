import {LoginActionTypes} from "./LoginActionTypes";

export type LoginActions =
  | {type: LoginActionTypes.INPUT_NICKNAME; nickname: string}
  | {type: LoginActionTypes.INPUT_EMAIL; email: string}
  | {type: LoginActionTypes.INPUT_PASSWORD; password: string}
  | {type: LoginActionTypes.INPUT_ERROR; errorMessage: string}
  | {type: LoginActionTypes.OFF_ERROR}
