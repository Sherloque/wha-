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


export const getVacancies = vacancies => ({
    type: 'GET_VACANCIES',
    payload: vacancies
})

export const getRecruitersVacancies = vacancies => ({
    type: 'GET_RECRUITERS_VACANCIES',
    payload: vacancies
})

export const getStudents = students => ({
    type:'GET_STUDENTS',
    payload:students
})


export const getNews = news => ({
    type: 'GET_NEWS',
    payload: news
})



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

export const createVacancy = (vacancyName, description, firmScope, firmLogo, firmName, address, contactNumber, email, website, status) => {
    let data = {
        vacancyName, description, firmScope, firmLogo, firmName, address, contactNumber, email, website, status
    }
    return dispatch => {
        return axios.post("/createvacancy", data, {
            headers: header
        })
            .then(response => {
                console.log(response)
                dispatch({ type: "VACANCY_CREATED" })
                history.push('/')
            }).catch(error => {
                alert(error)
            })
    }
}


export const fetchVacancies = () => {
    return dispatch => {
        return axios.get("/fetchvacancies", {
            headers:header
        })
        .then(response => {
            console.log(response)
            dispatch(getVacancies(response))
        })
    }
}

export const fetchStudents = () => {
    return dispatch => {
        return axios.get("/fetchstudents", {
            headers:header
        })
        .then(response => {
            dispatch(getStudents(response))
        })
    }
}


export const fetchNews = () => {
    return dispatch => {
        return axios.get('/fetchnews', {
            headers: header
        })
            .then(response => {
                console.log(response)
                dispatch(getNews(response.data))
            }).catch(error => {
                alert(error.response.data)
            })
    }
}

export const changeStudentInfo = (id, email, password) => {
    let data = {
        id, email, password
    }
    return dispatch => {
        return axios.post("/changestudentinfo", data, {
            headers: header
            })
            .then(response => {
                console.log(response)
                localStorage.setItem("token", response.data.token)
                dispatch(loginUser(response.data.studentInfo))
                history.push('/')
            }).catch(error => {
                alert(error)
            })
    }
}

export const changeRecruiterInfo = (id, password) => {
    let data = {
        id, password
    }
    return dispatch => {
        return axios.post("/changerecruiterinfo", data, {
            headers: header
            })
            .then(response => {
                console.log(response)
                localStorage.setItem("token", response.data.token)
                dispatch(loginUser(response.data.recruiterInfo))
                history.push('/')
            }).catch(error => {
                alert(error)
            })
    }
}

export const fetchRecruitersVacancies = (email) => {
    let data = {
        email
    }
    return dispatch => {
        return axios.post('/fetchrecruitersvacancies', data, {
            headers:header
        })
        .then(response => {
            console.log(response)
            dispatch(getRecruitersVacancies(response))
        })
    }
}