import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';


const mapDispatchToProps = {
};




class Vacancy extends React.Component {


    state = {

    }
    componentDidMount() {
    }



    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const { vacancy } = this.props;
        return (
            <>
            <h1>ВАКАНСИЯ </h1>
            <p>{vacancy.address}</p>
        <p>{vacancy.email}</p>
        <p>{vacancy.description}</p>
        <p>{vacancy.contactNumber}</p>
            </>
        );
    }
}


let ConnectedVacancy = connect(null, mapDispatchToProps)(Vacancy);
export default ConnectedVacancy;