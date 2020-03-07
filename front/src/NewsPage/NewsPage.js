import React from 'react';
import { connect } from 'react-redux';
import { fetchPendings } from '../store/action.js'
import { Link } from 'react-router-dom';
import { fetchNews } from '../store/action.js'
import News from './News'

const mapStateToProps = store => {
    return ({
        news: store.news.news
    }
    )
};


const mapDispatchToProps = {
    fetchNews,
};

class NewsPage extends React.Component {
    componentDidMount() {
        this.props.fetchNews();

    }

    render() {
        const news = Array.from(this.props.news)
        console.log(news)
        return (
            <>
                <h1>НОВОСТИ</h1>
                {(news) ? news.map((item, i) => (<div key={i}>
                    <News news={item}></News></div>))
                    : (<p className="load-placeholder">LOADING...</p>)
                }
                <button className=''><Link to="/" style={{ color: "white", textDecoration: 'none' }}>На главную</Link></button>
            </>
        );
    }

}

let ConnectedNewsPage = connect(mapStateToProps, mapDispatchToProps)(NewsPage);

export default ConnectedNewsPage;