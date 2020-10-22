import { Link } from '@reach/router';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BiCode, BiCookie, BiFootball } from 'react-icons/bi';
import Loader from './Loader';

const Topics = () => {
    const [topicsList, setTopicsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/topics`)
        .then(({data}) => {
            const newList = [...data.topics];

            newList.map((topic) => {
                switch(topic.slug) {
                    case 'cooking':
                        topic.icon = BiCookie;
                        break;
                    case 'football':
                        topic.icon = BiFootball;
                        break;
                    case 'coding':
                        topic.icon = BiCode;
                        break;
                    default:
                        break;
                }
            })
            setTopicsList(data.topics);
            setIsLoading(false)
        })
        .catch(({response}) => {
            console.log(response.status)
        })
    }, [])

    if (isLoading) return <Loader loading={isLoading} />
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