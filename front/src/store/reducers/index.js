import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import vacanciesRedcuer from './vacancies.reducer';
import studentsReducer from './students.reducer';
import newsReducer from './news.reducer';


export default combineReducers({
    auth:authReducer,
    vacs:vacanciesRedcuer,
    studs:studentsReducer,
    news:newsReducer

});