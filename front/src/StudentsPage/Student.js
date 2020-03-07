import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';


const mapDispatchToProps = {
};




class Student extends React.Component {
    state = {}
    componentDidMount() { }
    componentDidUpdate(prevProps, prevState) { }

    render() {
        const { student } = this.props;
        console.log(student)
        return (
            <>
                <h1>Студент</h1>
                <p>{student.firstname}, {student.lastname}</p>
                <p>{student.year} курс</p>
                <p>+{student.phonenumber}</p>
            </>
        );
    }
}


let ConnectedStudent = connect(null, mapDispatchToProps)(Student);
export default ConnectedStudent;