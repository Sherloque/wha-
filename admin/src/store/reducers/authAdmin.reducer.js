const initialState = {
    currentUser: {}
  }
  
  function authAdminReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_ADMIN':
        return { ...state, currentUser: action.payload }
      case 'LOGOUT_ADMIN':
        return { ...state, currentUser: {} }
      default:
        return state;
    }
  }
  
  export default authAdminReducer;