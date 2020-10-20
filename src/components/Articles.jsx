import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Articles = () => {

    const [articlesList, setArticlesList] = useState([]);

    useEffect(() => {
        axios.get('https://blakjak-nc-news-basic-api.herokuapp.com/api/articles')
        .then(({data}) => {
            setArticlesList(data.articles);
        })
    }, [])
//Still a work in progress
    return (
        <div className="Articles__container">
            <div className="Articles__list">
                {articlesList.map(article => {
                    return (
                        <div key={article.article_id} className="Articles__article">
                            <span className="Articles__article-header">
                                <h3 className="Articles__article-header--title">{article.title} </h3>
                                <p className="Articles__article-header--counter">{article.votes} </p>
                                <p className="Articles__article-header--counter">{article.comment_count} </p>
                            </span>
                        </div>
                    )
                })}            
            </div>
        </div>
    )
}

export default Articles;