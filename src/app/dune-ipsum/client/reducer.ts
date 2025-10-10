import { type TextState } from './types';

export type State = {
  text: string;
  isLoading: boolean;
  isRendering: boolean;
  errorMessage: string;
  incomingTextState: TextState | null;
  outgoingTextState: TextState | null;
};

export type Action =
  | { type: 'START_GENERATION' }
  | { type: 'GENERATION_SUCCESS'; payload: string }
  | { type: 'GENERATION_ERROR'; payload: string }
  | { type: 'SET_INCOMING_TEXT'; payload: Omit<TextState, 'key'> }
  | { type: 'SET_OUTGOING_TEXT'; payload: Omit<TextState, 'key'> | null }
  | { type: 'COMPLETE_RENDERING' }
  | { type: 'CLEAR_ERROR' };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_GENERATION':
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
        isRendering: true,
        outgoingTextState: state.incomingTextState,
        incomingTextState: null,
      };

    case 'GENERATION_SUCCESS':
      return {
        ...state,
        text: action.payload,
        isLoading: false,
      };

    case 'GENERATION_ERROR':
      return {
        ...state,
        isLoading: false,
        isRendering: false,
        errorMessage: action.payload,
      };

    case 'SET_INCOMING_TEXT':
      return {
        ...state,
        incomingTextState: {
          key: state.incomingTextState?.key ?? 0 + 1,
          ...action.payload,
        },
      };

    case 'SET_OUTGOING_TEXT':
      return {
        ...state,
        outgoingTextState: action.payload
          ? {
              key: state.outgoingTextState?.key ?? 0 + 1,
              ...action.payload,
            }
          : null,
      };

    case 'COMPLETE_RENDERING':
      return {
        ...state,
        isRendering: false,
        outgoingTextState: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        errorMessage: '',
      };

    default:
      return state;
  }
}
