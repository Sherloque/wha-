import store from '../store/store'
import history from '../history/history';
import axios from 'axios';

const header = {
    'Authorization': 'Bearer ' + localStorage.token
}


export const loginUser = user => ({
    type: 'LOGIN_USER',
    payload: user
})

export const logoutUser = () => ({
    type: 'LOGOUT_USER',
    action: localStorage.removeItem("token")
}, history.push("/"))



export const logUser = (login, password) => {
    return dispatch => {
        return axios.post('/login', {
            login, password
        })
            .then(response => {
                /*if (response.err) {
                    alert('Неправильный логин или пароль')
                } else {*/
                localStorage.setItem("token", response.data.token)
                dispatch(loginUser(response.data.userInfo))
                history.push("/")
                //}
            }).catch(error => {
                alert(error)
            })
    }
}



export const signUser = (email, firstname, lastname, year, phonenumber, ticket, password, status) => {
    return dispatch => {
        return axios.post("/signup", {
            email, firstname, lastname, year, phonenumber, ticket, password, status
        })
            .then(response => {
                /* if (response.err) {
                     alert('Login was already taken')
                 } else {*/
                dispatch({ type: 'REGISTERED' })
                localStorage.setItem("token", response.data.token)
                dispatch(loginUser(response.data.studentInfo))
                console.log(store.getState())
                history.push('/')
                //}
            }).catch(error => {
                alert(error)
            })
    }
}


export const signRecruiter = (email, firstname, lastname, phonenumber, password, status) => {
    return dispatch => {
        return axios.post("/signuprecruiter", {
            email, firstname, lastname, phonenumber, password, status
        })
            .then(response => {
                /* if (response.err) {
                     alert('Login was already taken')
                 } else {*/
                dispatch({ type: 'REGISTERED' })
                localStorage.setItem("token", response.data.token)
                dispatch(loginUser(response.data.recruiterInfo))
                console.log(store.getState())
                history.push('/')
                //}
            }).catch(error => {
                alert(error)
            })
    }
}

export const createVacancy = (vacancyName, description, firmScope, firmLogo, firmName, address, contactNumber, email, website) => {
    let data ={
        vacancyName, description, firmScope, firmLogo, firmName, address, contactNumber, email, website
    }
    return dispatch => {
        return axios.post("/createvacancy", data, {
           headers:header
        })
        .then(response => {
            console.log(response)
            dispatch({ type: "VERIFIED_RECRUITER" })
        }).catch(error => {
            alert(error)
        })
}
}