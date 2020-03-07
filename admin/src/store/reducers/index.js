import {combineReducers} from 'redux';
import authAdminReducer from './authAdmin.reducer';
import pendingsReducer from './pendings.reducer';
import newsReducer from './news.reducer';

export default combineReducers({
    authAdmin:authAdminReducer,
    pendings:pendingsReducer,
    news:newsReducer

});