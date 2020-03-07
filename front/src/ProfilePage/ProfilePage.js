import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { changeStudentInfo } from '../store/action.js'
import { changeRecruiterInfo } from '../store/action.js'
import { fetchRecruitersVacancies } from '../store/action.js'

const mapStateToProps = store => {
    if (jwt_decode(localStorage.token).sub.role === "recruiter") {
        return ({
            vacancies: store.vacs.recruitersVacancies
        })
    }
    else {
        return ({

        })
    }
};

const mapDispatchToProps = {
    onSendStudent: changeStudentInfo,
    onSendRecruiter: changeRecruiterInfo,
    fetchRecruitersVacancies
};




class ProfilePage extends React.Component {
    componentDidMount() {
        if (jwt_decode(localStorage.token).sub.role === "recruiter"){
            this.props.fetchRecruitersVacancies(this.state.email)
        }

    }
    constructor(props) {
        super(props);
        this.state = {
            email: (localStorage.token) ? jwt_decode(localStorage.token).sub.email : "",
            password: "",
            verpass: "",
            firstname: (localStorage.token) ? jwt_decode(localStorage.token).sub.firstname : "",
            lastname: (localStorage.token) ? jwt_decode(localStorage.token).sub.lastname : "",
            phonenumber: (localStorage.token) ? jwt_decode(localStorage.token).sub.phonenumber : "",
            year: (jwt_decode(localStorage.token).sub.role === "student") ? jwt_decode(localStorage.token).sub.year : "",
            ticket: (jwt_decode(localStorage.token).sub.role === "student") ? jwt_decode(localStorage.token).sub.ticket : "",
            valid: true,
            validPass: true,
        }

        this.onChange1 = e => this.setState({ email: e.target.value, valid: this.validateProfileLogin(e.target.value) ? true : false })
        this.onChange4 = e => this.setState({ password: e.target.value, validPass: this.validatePass(e.target.value) ? true : false })
        this.onChange5 = e => this.setState({ verpass: e.target.value, validPass: this.validateSubPass(e.target.value) ? true : false })
        this.validateProfileLogin = str => str.length > 0 && (this.state.lastname.length > 0) && this.state.firstname.length > 0
        this.validatePass = str => str === this.state.verpass
        this.validateSubPass = str => str === this.state.password

    }
    render() {
        if (jwt_decode(localStorage.token).sub.role === "student")
            return (
                <div className="profile-box">
                    <h1>Профиль</h1>
                    <p className="input-label">Логин:<input className="profile-input" value={this.state.email} onChange={this.onChange1}></input></p>
                    <p className="input-label">Имя:</p><p>{this.state.firstname}</p>
                    <p className="input-label">Фамилия:</p><p>{this.state.lastname}</p>
                    <p className="input-label">Курс:</p><p>{this.state.year}</p>
                    <p className="input-label">Номер студенческого:</p><p>{this.state.ticket}</p>
                    <p className="input-label">Номер телефона:</p><p>{this.state.phonenumber}</p>
                    <p className="input-label">Новый пароль (опционально):<input className="profile-input" value={this.state.password} type="password" onChange={this.onChange4}></input></p>
                    <p className="input-label">Повторите новый пароль:<input className="profile-input" value={this.state.subpass} type="password" onChange={this.onChange5}></input></p>
                    <button disabled={!(this.state.valid && this.state.validPass)}
                        onClick={() => this.props.onSendStudent(jwt_decode(localStorage.token).sub._id, this.state.email, (this.state.password) ? (this.state.password) : null, console.log(this.state))}
                    >Изменить данные</button>
                    <button><Link to="/" style={{ color: "white", textDecoration: 'none' }}>На главную</Link></button>
                </div>
            );
        else {
            return (
                <div className="profile-box">
                    <h1>Профиль</h1>
                    <p className="input-label">Логин:</p><p>{this.state.email}</p>
                    <p className="input-label">Имя:</p><p>{this.state.firstname}</p>
                    <p className="input-label">Фамилия:</p><p>{this.state.lastname}</p>
                    <p className="input-label">Номер телефона:</p><p>{this.state.phonenumber}</p>
                    <p className="input-label">Новый пароль (опционально):<input className="profile-input" value={this.state.password} type="password" onChange={this.onChange4}></input></p>
                    <p className="input-label">Повторите новый пароль:<input className="profile-input" value={this.state.subpass} type="password" onChange={this.onChange5}></input></p>
                    <button disabled={!(this.state.valid && this.state.validPass)}
                        onClick={() => this.props.onSendRecruiter(jwt_decode(localStorage.token).sub._id, (this.state.password) ? (this.state.password) : null, console.log(this.state))}
                    >Изменить данные</button>
                    <button><Link to="/" style={{ color: "white", textDecoration: 'none' }}>На главную</Link></button>
                </div>
            )
        }
    }
}
let ConnectedProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default ConnectedProfilePage;