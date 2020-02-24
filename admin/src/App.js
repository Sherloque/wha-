import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import './App.css';
import store from './store/store'
import history from './history/history';
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';
import DashboardPage from './DashboardPage/DashboardPage';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
        <Route path="/" component={LoginPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/dashboard" component={DashboardPage} exact />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
