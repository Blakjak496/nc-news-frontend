import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import ErrorPage from './errors/ErrorPage';
import {getArticles} from './utils/api';
import ArticleList from './ArticleList';

const Articles = (props) => {

    const [articlesList, setArticlesList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [orderAsc, setOrderAsc] = useState(false);
    const [errorCode, setErrorCode] =useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const topic = props.topic;
        getArticles({
            orderAsc,
            topic,
            sortBy,
            setArticlesList,
            setErrorCode,
            setIsLoading
        })

    }, [orderAsc, sortBy, props.topic]);

    
    const sortList = (event) => {
        if (sortBy === event.target.id || !sortBy) setOrderAsc(!orderAsc);
        else setOrderAsc(false);
        setSortBy(event.target.id);     
    }

    if (isLoading) return <Loader />
    if (errorCode) return <ErrorPage code={errorCode} />
    else return (
        <div className="articles__container">
            <ArticleList articlesList={articlesList} sort={sortList} setPage={props.setPage}/>
        </div>
    )
}

export default Articles;