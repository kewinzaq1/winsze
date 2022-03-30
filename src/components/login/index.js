const initialState = {
  option: 'register',
  email: '',
  login: '',
  password: '',
  isLoading: false,
  isError: false,
  errorMessage: null,
}

function loginReducer(state, action) {
  switch (action.type) {
    case 'INPUT_LOGIN': {
      return {...state, login: action.login}
    }
    case 'INPUT_EMAIL': {
      return {...state, email: action.email}
    }
    case 'INPUT_PASSWORD': {
      return {...state, password: action.password}
    }
    case 'INPUT_ERROR': {
      return {
        ...state,
        type: 'INPUT_ERROR',
        isLoading: false,
        isError: true,
        errorMessage: action.errorMessage,
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isError: false,
        isLoading: action.isLoading,
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
