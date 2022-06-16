export interface LoginState {
  option: string
  email: string
  nickname: string
  password: string
  isLoading: boolean
  isError: boolean
  errorMessage: string
}

enum LoginActionTypes {
  INPUT_NICKNAME = 'INPUT_NICKNAME',
  INPUT_EMAIL = 'INPUT_EMAIL',
  INPUT_PASSWORD = 'INPUT_PASSWORD',
  INPUT_ERROR = 'INPUT_ERROR',
  OFF_ERROR = 'OFF_ERROR'
}

export type LoginActions =
  | {type: LoginActionTypes.INPUT_NICKNAME; nickname: string}
  | {type: LoginActionTypes.INPUT_EMAIL; email: string}
  | {type: LoginActionTypes.INPUT_PASSWORD; password: string}
  | {type: LoginActionTypes.INPUT_ERROR; errorMessage: string}
  | {type: LoginActionTypes.OFF_ERROR}
export {LoginActionTypes}
