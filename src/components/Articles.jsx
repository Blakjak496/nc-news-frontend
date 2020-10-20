import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BiChat, BiHeart, BiCookie, BiFootball, BiCode, BiTime} from 'react-icons/bi';
import formatDate from './utils/utils';

const Articles = (props) => {

    const [articlesList, setArticlesList] = useState([]);
    const [usingTopics, setUsingTopics] = useState(props.useTopics || false);
    const [sortBy, setSortBy] = useState(null);
    const [orderAsc, setOrderAsc] = useState(true);

    useEffect(() => {
        axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/${usingTopics ? 'articles?topic='+ props.topic : 'articles'}`)
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
        })
    }, [usingTopics]);

    useEffect(() => {
        if (sortBy) {
            const order = orderAsc ? 'asc' : 'desc';
            axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/${usingTopics ? 'articles?topic='+ props.topic : 'articles'}&sort_by=${sortBy}&order=${order}`)
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
            })

        }
    }, [orderAsc]);
    
        
    
    const sortList = (event) => {
        if (event.target.id === sortBy) setOrderAsc(!orderAsc);
        else {
            setOrderAsc(true);
            setSortBy(event.target.id);
        } 
    }
//Still a work in progress
    return (
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
                                <h3 className="articles__article-title">{article.title} </h3>
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