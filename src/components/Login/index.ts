interface State {
  option: string
  email: string
  nickname: string
  password: string
  isLoading: boolean
  isError: boolean
  errorMessage: string
}

enum Actions {
  INPUT_NICKNAME = 'INPUT_NICKNAME',
  INPUT_EMAIL = 'INPUT_EMAIL',
  INPUT_PASSWORD = 'INPUT_PASSWORD',
  INPUT_ERROR = 'INPUT_ERROR',
  SET_LOADING = 'SET_LOADING',
}

const initialState: State = {
  option: 'register',
  email: '',
  nickname: '',
  password: '',
  isLoading: false,
  isError: false,
  errorMessage: '',
}

function loginReducer(state: State, action: {type: Actions} & State) {
  switch (action.type) {
    case Actions.INPUT_NICKNAME: {
      return {...state, login: action.nickname}
    }
    case Actions.INPUT_EMAIL: {
      return {...state, email: action.email}
    }
    case Actions.INPUT_PASSWORD: {
      return {...state, password: action.password}
    }
    case Actions.SET_LOADING: {
      return {
        ...state,
        type: 'INPUT_ERROR',
        isLoading: false,
        isError: true,
        errorMessage: action.errorMessage,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const inputEmail = (dispatch, email) =>
  dispatch({
    type: 'INPUT_EMAIL',
    email,
  })
const inputLogin = (dispatch, login) =>
  dispatch({
    type: 'INPUT_LOGIN',
    login,
  })
const inputPassword = (dispatch, password) =>
  dispatch({
    type: 'INPUT_PASSWORD',
    password,
  })
const setError = (dispatch, errorMessage) =>
  dispatch({
    type: 'INPUT_ERROR',
    isLoading: false,
    errorMessage,
  })
const setLoading = (dispatch, isLoading) =>
  dispatch({
    type: 'SET_LOADING',
    isLoading: isLoading,
  })

export {
  loginReducer,
  initialState,
  inputEmail,
  inputLogin,
  inputPassword,
  setError,
  setLoading,
}
