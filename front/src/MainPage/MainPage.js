import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';
import jwt_decode from 'jwt-decode';
import { logoutUser } from '../store/action.js'


const mapStateToProps = store => ({
    User: store.currentUser,
});




class MainPage extends React.Component {
    render() {
        if (localStorage.token)
            return (
                <div>
                    <div className="box"><h1>Привет, {jwt_decode(localStorage.token).sub.firstname}</h1>
                        <button className="mainpage-logout-btn" onClick={logoutUser}>Выйти</button>
                    </div>
                    {(jwt_decode(localStorage.token).sub.role === "recruiter") ? (
                        <>
                            <button><Link to="/createvacancy" style={{ color: "white", textDecoration: 'none' }}>Создать вакансию </Link></button>
                            <button><Link to="/students" style={{ color: "white", textDecoration: 'none' }}>Студенты</Link></button>
                        </>
                    ) : (
                            null
                        )}
                    <button><Link to="/profile" style={{ color: "white", textDecoration: 'none' }}>Профиль</Link></button>
                    <button className=''><Link to="/news" style={{ color: "white", textDecoration: 'none' }}>Новости</Link></button>
                    <button className=''><Link to="/vacancies" style={{ color: "white", textDecoration: 'none' }}>Вакансии</Link></button>
                    <button className=''><Link to="" style={{ color: "white", textDecoration: 'none' }}>Полезная информация</Link></button>
                </div>
            );
        else {
            return (
                <div className="main-box">
                    <button className="mainpage-login-btn"><Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Войти</Link></button>
                    <button className="mainpage-signup-btn"><Link to="/signup" style={{ color: "white", textDecoration: 'none' }}>Зарегистрироваться</Link></button>
                </div>
            )
        }
    }

}

let ConnectedMainPage = connect(mapStateToProps)(MainPage);

export default ConnectedMainPage;