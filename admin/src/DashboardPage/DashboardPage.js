import React from 'react';
import { connect } from 'react-redux';
import { fetchPendings } from '../store/action.js'
//import { fetchRecruiters } from '../store/action.js'
import {verifyStudent} from '../store/action.js'
import {deleteStudent} from '../store/action.js'
import {verifyRecruiter} from '../store/action.js'


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
    verifyRecruiter
};

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.fetchPendings();

    }

    render() {
        const  peStudents  = this.props
        //console.log(peStudents.pendingStudents)
        console.log(this.props)
        return (
            <>
                {(peStudents.pendingStudents.data) ? (peStudents.pendingStudents.data.pendingstuds.map((item, i) => (<div><p>{item.email},{item.firstname} {item.lastname}</p>
                <button className = "verify-student" onClick={() => this.props.verifyStudent(item.email)}>Подтвердить</button>
                <button className = "delete-student" onClick={() => this.props.deleteStudent(item._id)}>Ремувнуть</button></div>)))
                   : (<p className="load-placeholder">LOADING...</p>)
                }
                {(peStudents.pendingStudents.data) ? (peStudents.pendingStudents.data.pendingrecrs.map((item, i) => (<div><p>{item.email},{item.firstname} {item.lastname}</p>
                <button className = "verify-student" onClick={() => this.props.verifyRecruiter(item.email)}>Подтвердить</button>
                <button className = "delete-student" onClick={() => this.props.deleteStudent(item._id)}>Ремувнуть</button></div>)))
                   : (<p className="load-placeholder">LOADING...</p>)
                }
            </>
        );
    }

}

let ConnectedDashboardPage = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

export default ConnectedDashboardPage;