import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import './App.css';
import store from './store/store'
import history from './history/history';
import MainPage from './MainPage/MainPage';
import SignUpPage from './SignUpPage/SignUpPage';
import LoginPage from './LoginPage/LoginPage';
import CreateVacancyPage from './CreateVacancyPage/CreateVacancyPage';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
        <Route path="/" component={MainPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/createvacancy" component ={CreateVacancyPage} exact />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
