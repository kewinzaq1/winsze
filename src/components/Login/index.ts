interface State {
  option: string;
  email: string;
  nickname: string;
  password: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

enum ActionType {
  INPUT_NICKNAME = "INPUT_NICKNAME",
  INPUT_EMAIL = "INPUT_EMAIL",
  INPUT_PASSWORD = "INPUT_PASSWORD",
  INPUT_ERROR = "INPUT_ERROR",
  OFF_ERROR = "OFF_ERROR",
}

const initialState: State = {
  option: "register",
  email: "",
  nickname: "",
  password: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

type Action =
  | { type: ActionType.INPUT_NICKNAME; nickname: string }
  | { type: ActionType.INPUT_EMAIL; email: string }
  | { type: ActionType.INPUT_PASSWORD; password: string }
  | { type: ActionType.INPUT_ERROR; errorMessage: string }
  | { type: ActionType.OFF_ERROR };

function loginReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.INPUT_NICKNAME: {
      return { ...state, nickname: action.nickname };
    }
    case ActionType.INPUT_EMAIL: {
      return { ...state, email: action.email };
    }
    case ActionType.INPUT_PASSWORD: {
      return { ...state, password: action.password };
    }
    case ActionType.INPUT_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.errorMessage,
      };
    }
    case ActionType.OFF_ERROR: {
      return {
        ...state,
        isError: true,
        errorMessage: "",
      };
    }
  }
}

export { loginReducer, initialState, ActionType };
