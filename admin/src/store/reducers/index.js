import {combineReducers} from 'redux';
import authAdminReducer from './authAdmin.reducer';
import pendingsReducer from './pendings.reducer';

export default combineReducers({
    authAdmin:authAdminReducer,
    pendings:pendingsReducer,

});