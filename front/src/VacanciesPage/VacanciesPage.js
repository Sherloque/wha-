import React from 'react';
import { connect } from 'react-redux';
import { fetchPendings } from '../store/action.js'
import { Link } from 'react-router-dom';
import { fetchVacancies } from '../store/action.js'
import Vacancy from './Vacancy'



const mapStateToProps = store => {
    return ({
        vacancies: store.vacs.vacancies

    }
    )
};


const mapDispatchToProps = {
    fetchVacancies,
};

class VacanciesPage extends React.Component {
    componentDidMount() {
        this.props.fetchVacancies();

    }

    render() {
        const vacancies = this.props.vacancies.data
        console.log(vacancies)
        return (
            <><p>VACANCIES</p>
                {(vacancies) ? vacancies.map((item, i) => (<div key={i}><p></p>
                    <Vacancy vacancy={item}></Vacancy></div>))
                    : (<p className="load-placeholder">LOADING...</p>)
                }
                <button className=''><Link to="/" style={{ color: "white", textDecoration: 'none' }}>НА главную</Link></button>
            </>
        );
    }

}

let ConnectedVacanciesPage = connect(mapStateToProps, mapDispatchToProps)(VacanciesPage);

export default ConnectedVacanciesPage;