import { Link } from '@reach/router';
import React, { useState, useEffect } from 'react';
import ErrorPage from './errors/ErrorPage';
import Loader from './Loader';
import { getTopics } from './utils/api';

const Topics = () => {
    const [topicsList, setTopicsList] = useState([]);
    const [errorCode, setErrorCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTopics({
            setTopicsList,
            setIsLoading,
            setErrorCode
        })
    }, [])

    if (isLoading) return <Loader loading={isLoading} />
    if (errorCode) return <ErrorPage code={errorCode} />
    else return (
        <div className="topics__container">
            {topicsList.map((topic) => {
                return (
                    <div key={topic.slug} className="topics__topic-card">
                        <span className="topics__topic-info">
                            <Link className="topics__title" to={`/topics/${topic.slug}`} ><topic.icon/> {topic.slug}</Link>
                            <p className="topics__summary">{topic.description} </p>
                        </span>
                    </div>
                )
            })}
        </div>
    )

}

export default Topics;