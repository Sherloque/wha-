import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';
import jwt_decode from 'jwt-decode';
import SignUpStudent from '../SignUpStudent/SignUpStudent';
import SignUpRecruiter from '../SignUpRecruiter/SignUpRecruiter';







class SignUpPage extends React.Component {


    constructor(props) {
        super(props);
    
    
        this.state = {
            checked: true,
        }

        this.onChange1 = e => this.setState({checked: (this.state.checked == true) ? (false) :(true)}, console.log(this.state))
    }

    render() {
        return (
            <>
            <input type="checkbox" onChange={this.onChange1}></input>
            {(this.state.checked === true) ? 
            (<SignUpStudent>
            </SignUpStudent>) :
            (<SignUpRecruiter></SignUpRecruiter>)}
            </>
        );
    }

}

let ConnectedSignUpPage = connect(null, null)(SignUpPage);

export default ConnectedSignUpPage;