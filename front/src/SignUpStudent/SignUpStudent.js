import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {signUser} from '../store/action.js'


const mapStateToProps = store => {
  return ({
  })
};

const mapDispatchToProps = {
  onSend: signUser
};




class SignUpStudent extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      email:"",
      firstname: "",
      lastname: "",
      phonenumber:"",
      ticket:"",
      year:"",
      password: "",
      subpass:"",
      validPass:true,
      valid:true
    }

    this.onChange1 = e => this.setState({ email: e.target.value})
    this.onChange2 = e => this.setState({ firstname: e.target.value})
    this.onChange3 = e => this.setState({ lastname: e.target.value})
    this.onChange4 = e => this.setState({ phonenumber: e.target.value})
    this.onChange5 = e => this.setState({ password: e.target.value})
    this.onChange6 = e => this.setState({ subpass: e.target.value})
    this.onChange7 = e => this.setState({ year: e.target.value})
    this.onChange8 = e => this.setState({ ticket: e.target.value})
  }
  render() {
    return (
      <>
      <div className="sign-box">
        <h1>Регистрация для студента</h1>
        <input required className="email" type="text" value={this.state.email} onChange={this.onChange1} placeholder="email"></input>
        <input required className="firstname" type="text" value={this.state.firstname} onChange={this.onChange2} placeholder="Firstname"></input>
        <input required className="lastname" type="text" value={this.state.lastname} onChange={this.onChange3} placeholder="Lastname"></input>
        <input required className="number" type="number" value={this.state.phonenumber} onChange={this.onChange4} placeholder="phone number"></input>
        <input required className="ticket" type="text" value={this.state.ticket} onChange={this.onChange8} placeholder="student ticket No"></input>
        <p>Курс</p>
        <select onChange={this.onChange7}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <input required className="password" type="password" value={this.state.password} onChange={this.onChange5} placeholder="password"></input>
        <input className="password" type="password" value={this.state.subpass} onChange={this.onChange6} placeholder="repeat password"></input>
        <button className="signup-btn" disabled={!(this.state.valid && this.state.validPass)}
          onClick={() => this.props.onSend(this.state.email, this.state.firstname, this.state.lastname,this.state.year, this.state.phonenumber,this.state.ticket,this.state.password, "pending")}
        >Зарегистрироваться</button>
        <button className="cancel-btn"><Link to="/" style={{color:"white", textDecoration: 'none' }}>Отмена</Link></button>
        </div>
      </>
    );
  }
}

let ConnectedSignUpStudent = connect(mapStateToProps, mapDispatchToProps)(SignUpStudent)

export default ConnectedSignUpStudent;