import React from 'react';
import { connect } from 'react-redux';
import { fetchPendings } from '../store/action.js'
import { Link } from 'react-router-dom';
//import { fetchRecruiters } from '../store/action.js'
import { verifyStudent } from '../store/action.js'
import { deleteStudent } from '../store/action.js'
import { verifyRecruiter } from '../store/action.js'
import { deleteRecruiter } from '../store/action.js'
import { verifyVacancy } from '../store/action.js'
import { deleteVacancy } from '../store/action.js'


const mapStateToProps = store => {
    return ({
        pendingStudents: store.pendings.pendings,

    }//,console.log(store.pendings.pendings)
    )
};


const mapDispatchToProps = {
    fetchPendings,
    verifyStudent,
    deleteStudent,
    verifyRecruiter,
    deleteRecruiter,
    verifyVacancy,
    deleteVacancy
};

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.fetchPendings();

    }

    render() {
        const peStudents = this.props
        //console.log(peStudents.pendingStudents)
        console.log(this.props)
        return (
            <><p>PENDING STUDENTS</p>
                {(peStudents.pendingStudents.data) ? (peStudents.pendingStudents.data.pendingstuds.map((item, i) => (<div><p>{item.email},{item.firstname} {item.lastname}</p>
                    <button className="verify-student" onClick={() => this.props.verifyStudent(item.email)}>Подтвердить</button>
                    <button className="delete-student" onClick={() => this.props.deleteStudent(item._id)}>Ремувнуть</button></div>)))
                    : (<p className="load-placeholder">LOADING...</p>)
                }
                <p>PENDING RECRUITERS</p>
                {(peStudents.pendingStudents.data) ? (peStudents.pendingStudents.data.pendingrecrs.map((item, i) => (<div><p>{item.email},{item.firstname} {item.lastname}</p>
                    <button className="verify-student" onClick={() => this.props.verifyRecruiter(item.email)}>Подтвердить</button>
                    <button className="delete-student" onClick={() => this.props.deleteRecruiter(item._id)}>Ремувнуть</button></div>)))
                    : (<p className="load-placeholder">LOADING...</p>)
                }
                <p>PENDING VACANCIES</p>
                {(peStudents.pendingStudents.data) ? (peStudents.pendingStudents.data.pendingvacs.map((item, i) => (<div><p>{item.vacancyName},{item.firmLogo} {item.email}</p>
                    <button className="verify-student" onClick={() => this.props.verifyVacancy(item.email, item.vacancyName, item.description)}>Подтвердить</button>
                    <button className="delete-student" onClick={() => this.props.deteleVacancy(item._id)}>Ремувнуть</button></div>)))
                    : (<p className="load-placeholder">LOADING...</p>)
                }
                <button className=''><Link to="/main" style={{ color: "white", textDecoration: 'none' }}>На главную</Link></button>
            </>
        );
    }

}

let ConnectedDashboardPage = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

export default ConnectedDashboardPage;