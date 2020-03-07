import React from 'react';
import { connect } from 'react-redux';
import { fetchPendings } from '../store/action.js'
import { Link } from 'react-router-dom';
import { fetchStudents } from '../store/action.js'
import Student from './Student'



const mapStateToProps = store => {
    return ({
       students: store.studs.students

    }
    )
};


const mapDispatchToProps = {
    fetchStudents,
};

class StudentsPage extends React.Component {
    componentDidMount() {
        this.props.fetchStudents();

    }

    render() {
        const students = this.props.students.data
        return (
            <><p>STUDENTS</p>
                {(students) ? students.map((item, i) => (<div key={i}><p></p>
                <Student student={item}></Student></div>))
                   : (<p className="load-placeholder">LOADING...</p>)
                }
                <button className=''><Link to="/" style={{ color: "white", textDecoration: 'none' }}>НА главную</Link></button>
            </>
        );
    }

}

let ConnectedStudentsPage = connect(mapStateToProps, mapDispatchToProps)(StudentsPage);

export default ConnectedStudentsPage;