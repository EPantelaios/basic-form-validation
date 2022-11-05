import { useReducer } from 'react';

type StateProps = {
  value: string;
  isTouched: boolean;
  isValid: boolean;
  hasError: boolean;
  validateValue: (value: string) => boolean;
};

type ActionProps = {
  type: string;
  value?: string;
};

const inputStateReducer = (
  state: StateProps,
  action: ActionProps
): StateProps => {
  let currentState: StateProps;

  if (action.type === 'INPUT') {
    currentState = { ...state, value: action.value };
  } else if (action.type === 'BLUR') {
    currentState = {
      ...state,
      isTouched: true,
    };
  } else if (action.type === 'RESET') {
    currentState = {
      ...state,
      value: '',
      isTouched: false,
    };
  }
  const isValid =
    currentState.value != null && state.validateValue(currentState.value);
  const hasError = !isValid && currentState.isTouched;
  return { ...currentState, isValid: isValid, hasError: hasError };
};

const useInput = (validateValue: StateProps['validateValue']) => {
  const initialStateInput: StateProps = {
    value: '',
    isTouched: false,
    isValid: false,
    hasError: false,
    validateValue: validateValue,
  };

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialStateInput
  );

  const valueChangeHandler = (event: { target: HTMLInputElement }) => {
    dispatch({
      type: 'INPUT',
      value: event.target.value,
    });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: inputState.isValid,
    hasError: inputState.hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
