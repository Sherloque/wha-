import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';
import {createVacancy} from '../store/action.js'


const mapStateToProps = store => ({
});

const mapDispatchToProps = {
    onSend: createVacancy
  };



class CreateVacancyPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            vacancyName: "",
            description: "",
            firmScope: "",
            firmLogo: "",
            firmName: "",
            address: "",
            contactNumber: "",
            email: "",
            website: "",
        }
        this.onChange1 = e => this.setState({ vacancyName: e.target.value})
        this.onChange2 = e => this.setState({ description: e.target.value})
        this.onChange3 = e => this.setState({ firmScope: e.target.value})
        this.onChange4 = e => this.setState({ firmLogo: e.target.value})
        this.onChange5 = e => this.setState({ firmName: e.target.value})
        this.onChange6 = e => this.setState({ address: e.target.value})
        this.onChange7 = e => this.setState({ contactNumber: e.target.value})
        this.onChange8 = e => this.setState({ email: e.target.value})
        this.onChange9 = e => this.setState({ website: e.target.value})
    }
    render() {
        return (
            <div>
                <p>СОЗДАНИЕ ВАКАНСИИ</p>
                <input className="" type="text" value={this.state.vacancyName} onChange={this.onChange1} placeholder="Название вакансии"></input>
                <input className="" type="text" value={this.state.description} onChange={this.onChange2} placeholder="описание"></input>
                <input className="" type="text" value={this.state.firmScope} onChange={this.onChange3} placeholder="сфера деятельности компании"></input>
                <input className="" type="text" value={this.state.firmLogo} onChange={this.onChange4} placeholder="логотип компании"></input>
                <input className="" type="text" value={this.state.firmName} onChange={this.onChange5} placeholder="Название компании"></input>
                <input className="" type="text" value={this.state.address} onChange={this.onChange6} placeholder="адрес"></input>
                <input className="" type="text" value={this.state.contactNumber} onChange={this.onChange7} placeholder="контактный телефон"></input>
                <input className="" type="text" value={this.state.email} onChange={this.onChange8} placeholder="email"></input>
                <input className="" type="text" value={this.state.website} onChange={this.onChange9} placeholder="веб сайт"></input>
                <button onClick ={() => {this.props.onSend(this.state.vacancyName, this.state.description, this.state.firmScope, this.state.firmLogo, this.state.firnName, this.state.address, this.state.contactNumber, this.state.email, this.state.website, "pending")}}>Отправить</button>
            </div>
        );
    }

}

let ConnectedCreateVacancyPage = connect(mapStateToProps, mapDispatchToProps)(CreateVacancyPage);

export default ConnectedCreateVacancyPage;