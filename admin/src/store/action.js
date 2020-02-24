import store from '../store/store'
import history from '../history/history';
import axios from 'axios';

const header = {
    'Authorization': 'Bearer ' + localStorage.token
}


export const loginAdmin = admin => ({
    type: 'LOGIN_ADMIN',
    payload: admin
})

export const logoutAdmin = () => ({
    type: 'LOGOUT_ADMIN',
    action: localStorage.removeItem("token")
}, history.push("/"))


export const getPendings = pendings => ({
    type: 'GET_PENDINGS',
    payload: pendings
})



export const logAdmin = (login, password) => {
    return dispatch => {
        return axios.post("/loginadmin", {
            login, password
        })
            .then(response => {
                if (response.err) {
                    alert('Неправильный логин или пароль')
                } else {
                    localStorage.setItem("token", response.data.token)
                    dispatch(loginAdmin(response.data.studentInfo))
                    history.push("/dashboard")
                }
            })
    }
}



export const signAdmin = (email, firstname, lastname, password) => {
    return dispatch => {
        return axios.post("/signupadmin", {
            email, firstname, lastname, password
        })
            .then(response => {
                /* if (response.err) {
                     alert('Login was already taken')
                 } else {*/
                dispatch({ type: 'REGISTERED' })
                localStorage.setItem("token", response.data.token)
                dispatch(loginAdmin(response.data.adminInfo))
                console.log(store.getState())
                history.push('/dashboard')
                //}
            }).catch(error => {
                alert(error)
            })
    }
}


export const fetchPendings = () => {
    return dispatch => {
        return axios.get('/fetchpendingstudents', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(data => {
                dispatch(getPendings(data))
            })
    }
}

export const verifyStudent = (email) => {
    let data = {
        email: email
    }
    return dispatch => {
        return axios.post('/verifystudent', data, {
            headers: header
        })
            .then(response => {
                console.log(response)
                dispatch({ type: "VERIFIED_STUDENT" })
            }).catch(error => {
                alert(error)
            })
    }
}


export const deleteStudent = (id) => {
    return dispatch => {
        return axios.delete(`/deletestudent/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(response => {
                console.log(response)
            }).catch(error => {
                alert(error.response.data)
            })
    }
}

export const verifyRecruiter = (email) => {
    let data = {
        email: email
    }
    return dispatch => {
        return axios.post('/verifyrecruiter', data, {
            headers: header
        })
            .then(response => {
                console.log(response)
                dispatch({ type: "VERIFIED_RECRUITER" })
            }).catch(error => {
                alert(error)
            })
    }
}