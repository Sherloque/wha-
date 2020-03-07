import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';
import jwt_decode from 'jwt-decode';
import { logoutAdmin } from '../store/action.js'


const mapStateToProps = store => ({
    User: store.currentUser,
});




class MainPage extends React.Component {
    render() {
        return (
            <div>
                {(localStorage.token) ? (
                    <div className="box"><h1>Здравствуйте</h1>
                        <button className="mainpage-logout-btn" onClick={logoutAdmin}>Выйти</button>
                        <button className=''><Link to="/dashboard" style={{ color: "white", textDecoration: 'none' }}>Панель администрации</Link></button>
                        <button className=''><Link to="/createnews" style={{ color: "white", textDecoration: 'none' }}>Создать новость</Link></button>
                        <button className=''><Link to="/news" style={{ color: "white", textDecoration: 'none' }}>Новости</Link></button>
                        <button className=''><Link to="/vacancies" style={{ color: "white", textDecoration: 'none' }}>Вакансии</Link></button>
                        <button className=''><Link to="/students" style={{ color: "white", textDecoration: 'none' }}>Студенты</Link></button>
                        <button className=''><Link to="" style={{ color: "white", textDecoration: 'none' }}>Полезная информация</Link></button>
                    </div>

                ) : (
                        <div className="main-box">
                            <button className="mainpage-login-btn"><Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Войти</Link></button>
                            <button className="mainpage-signup-btn"><Link to="/signup" style={{ color: "white", textDecoration: 'none' }}>Зарегистрироваться</Link></button>
                        </div>
                    )}
            </div>
        );
    }

}

let ConnectedMainPage = connect(mapStateToProps)(MainPage);

export default ConnectedMainPage;