import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BiChat, BiHeart, BiCookie, BiFootball, BiCode, BiTime} from 'react-icons/bi';
import formatDate from './utils/utils';
import { Link } from '@reach/router';
import Loader from './Loader';
import ErrorPage from './errors/ErrorPage';

const Articles = (props) => {

    const [articlesList, setArticlesList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [orderAsc, setOrderAsc] = useState(false);
    const [errorCode, setErrorCode] =useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const order = orderAsc ? 'asc':'desc';
        axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles`, {
            params: {
                topic: props.topic,
                sort_by: sortBy,
                order: order
            }
        })
        .then(({data}) => {
            
            const arr = data.articles.map(article => {
                switch(article.topic) {
                    case 'cooking':
                        article.topicIcon = BiCookie;
                        break;
                    case 'football':
                        article.topicIcon = BiFootball;
                        break;
                    case 'coding':
                        article.topicIcon = BiCode;
                        break;
                    default:
                        break;
                }
                return article;
            })
            setArticlesList(arr);
            setIsLoading(false);
        })
        .catch(({response}) => {
            setErrorCode(response.status);
            setIsLoading(false);
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
            <div className="articles__list">
                <span className="articles__filter-btn-box">
                    <p>sort</p>
                    <button className="articles__filter-btn" id="votes" onClick={sortList}><BiHeart/></button>
                    <button className="articles__filter-btn" id="created_at" onClick={sortList}><BiTime /> </button>
                    <button className="articles__filter-btn" id="comment_count" onClick={sortList}><BiChat/> </button>
                </span>
                {articlesList.map(article => {
                    return (
                        <div key={article.article_id} className="articles__article">
                            <span className="articles__article-header">
                                <p className="articles__article-header--topic"><article.topicIcon/> {article.topic} </p>
                                <p className="articles__article-header--created">{formatDate(article.created_at)} </p>
                            </span>
                            <span>
                                <Link className="articles__article-title" to={`/articles/${article.article_id}`}>{article.title} </Link>
                            </span>
                            <span className="articles__article-footer">
                                <p className="articles__article-footer--counter"><BiHeart/> {article.votes} </p>
                                <p className="articles__article-footer--counter"><BiChat/> {article.comment_count} </p>
                            </span>
                        </div>
                    )
                })}            
            </div>
        </div>
    )
}

export default Articles;