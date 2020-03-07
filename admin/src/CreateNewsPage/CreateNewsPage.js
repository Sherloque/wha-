import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createNews } from '../store/action.js'


const mapStateToProps = store => {
    return ({
    })
};

const mapDispatchToProps = {
    onSend: createNews
  };




class CreateNewsPage extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            title: '',
            description: '',
            photo: '',
        }

        this.onChange1 = e => this.setState({ title: e.target.value })
        this.onChange2 = e => this.setState({ description: e.target.value })
    }
    render() {
        return (
            <>
                <div className="sign-box">
                    <h1>Создание новости</h1>
                    <input required type="text" value={this.state.title} onChange={this.onChange1} placeholder="Заголовок"></input>
                    <input required type="text" value={this.state.description} onChange={this.onChange2} placeholder="Описание"></input>
                    <button onClick={() => this.props.onSend(this.state.title, this.state.description)}
                    >Создать</button>
                    <button><Link to="/main" style={{ color: "white", textDecoration: 'none' }}>Отмена</Link></button>
                </div>
            </>
        );
    }
}

let ConnectedCreateNewsPage = connect(mapStateToProps, mapDispatchToProps)(CreateNewsPage)

export default ConnectedCreateNewsPage;