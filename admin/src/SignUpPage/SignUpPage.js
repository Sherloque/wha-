import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signAdmin } from '../store/action.js'


const mapStateToProps = store => {
  return ({
  })
};

const mapDispatchToProps = {
  onSend: signAdmin
};




class SignUpPage extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      subpass: "",
      validPass: true,
      valid: true
    }

    this.onChange1 = e => this.setState({ email: e.target.value })
    this.onChange2 = e => this.setState({ firstname: e.target.value })
    this.onChange3 = e => this.setState({ lastname: e.target.value })
    this.onChange5 = e => this.setState({ password: e.target.value })
    this.onChange6 = e => this.setState({ subpass: e.target.value })
  }
  render() {
    return (
      <>
        <div className="sign-box">
          <h1>Регистрация для админа</h1>
          <input required className="email" type="text" value={this.state.email} onChange={this.onChange1} placeholder="email"></input>
          <input required className="firstname" type="text" value={this.state.firstname} onChange={this.onChange2} placeholder="Firstname"></input>
          <input required className="lastname" type="text" value={this.state.lastname} onChange={this.onChange3} placeholder="Lastname"></input>
        <input required className="password" type="password" value={this.state.password} onChange={this.onChange5} placeholder="password"></input>
          <input className="password" type="password" value={this.state.subpass} onChange={this.onChange6} placeholder="repeat password"></input>
          <button className="signup-btn" disabled={!(this.state.valid && this.state.validPass)}
            onClick={() => this.props.onSend(this.state.email, this.state.firstname, this.state.lastname, this.state.password)}
          >Зарегистрироваться</button>
          <button className="cancel-btn"><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Отмена</Link></button>
        </div>
      </>
    );
  }
}

let ConnectedSignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignUpPage)

export default ConnectedSignUpPage;