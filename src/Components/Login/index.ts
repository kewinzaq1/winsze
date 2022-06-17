import {LoginActions} from "../../Utils/Models/Login/LoginAction.model"
import {LoginState} from "../../Utils/Models/Login/LoginState.model";
import {LoginActionTypes} from "../../Utils/Models/Login/LoginActionTypes";


export const initialLoginState: LoginState = {
  option: 'register',
  email: '',
  nickname: '',
  password: '',
  isLoading: false,
  isError: false,
  errorMessage: ''
}

export function loginReducer(state: LoginState, action: LoginActions): LoginState {
  switch (action.type) {
    case LoginActionTypes.INPUT_NICKNAME: {
      return {...state, nickname: action.nickname}
    }
    case LoginActionTypes.INPUT_EMAIL: {
      return {...state, email: action.email}
    }
    case LoginActionTypes.INPUT_PASSWORD: {
      return {...state, password: action.password}
    }
    case LoginActionTypes.INPUT_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.errorMessage
      }
    }
    case LoginActionTypes.OFF_ERROR: {
      return {
        ...state,
        isError: true,
        errorMessage: ''
      }
    }
  }
}

