import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';


const mapDispatchToProps = {
};




class News extends React.Component {


    state = {

    }
    componentDidMount() {
    }



    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const { news } = this.props;
        return (
            <>
                <h1>{news.title}</h1>
                <p>{news.description}</p>
            </>
        );
    }
}


let ConnectedNews = connect(null, mapDispatchToProps)(News);
export default ConnectedNews;