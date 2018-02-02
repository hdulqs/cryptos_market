
export const SESSIONS_FORM_SUBMITED = 'SESSIONS_FORM_SUBMITED'

const initialState = {
  session: false,
  jwt: '',
  email: '',
  user: {},
  errors: {}
};

export default function SessionsReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'SESSIONS_FORM_SUBMITED_SUCCESS':
      return {
        ...state,
        jwt: action.payload.sessions.jwt,
        email: action.payload.sessions.email,
        user: action.payload.sessions,
        session: true,
        errors: {}
      }
    case 'SESSIONS_ERROR':
      return {
        ...state,
        errors: action.payload.errors
      }
    case 'SESSIONS_RETRIEVED_FROM_LOCAL_STORAGE':
      return {
        ...state,
        jwt: action.payload.jwt,
        session: action.payload.session,
        email: action.payload.email,
        user: action.payload.user
      }
    default:
      return state;
  }
}
