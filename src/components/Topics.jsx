import { Link, Router } from '@reach/router';
import React, { useState, useEffect } from 'react';
import ErrorPage from './errors/ErrorPage';
import Loader from './Loader';
import { getArticles, getTopics } from './utils/api';
import ArticleList from './ArticleList';

const Topics = (props) => {
    const [topicsList, setTopicsList] = useState([]);
    const [errorCode, setErrorCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [articlesList, setArticlesList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [orderAsc, setOrderAsc] = useState(false);
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        getTopics({
            setTopicsList,
            setIsLoading,
            setErrorCode
        })
    }, [])

    useEffect(() => {
        getArticles({
            orderAsc,
            topic,
            sortBy,
            setArticlesList,
            setErrorCode,
            setIsLoading
        })
    }, [orderAsc, sortBy, topic])

    const sortList = (event) => {
        if (sortBy === event.target.id || !sortBy) setOrderAsc(!orderAsc);
        else setOrderAsc(false);
        setSortBy(event.target.id);     
    }

    const changeTopic = (event) => {
        setTopic(event.target.id);
        props.setPage(event.target.id)
    }

    if (isLoading) return <Loader loading={isLoading} />
    if (errorCode) return <ErrorPage code={errorCode} />
    else return (
        <div className="topics__wrapper">
            <div className="topics__container">
                {topicsList.map((topic) => {
                    return (
                        <div key={topic.slug} className="topics__topic-card">
                            <span className="topics__topic-info">
                                <Link id={topic.slug} onClick={changeTopic} className="topics__title" to={`/topics/${topic.slug}`} ><topic.icon/> {topic.slug}</Link>
                                <p className="topics__summary">{topic.description} </p>
                            </span>
                        </div>
                    )
                })}
                <hr className="divider"/>
            </div>
            <Router primary={false}>
                <ArticleList path="/:topic" articlesList={articlesList} sort={sortList} class={{list: "topics__articles"}} setPage={props.setPage} />
            </Router>

        </div>
    )

}

export default Topics;