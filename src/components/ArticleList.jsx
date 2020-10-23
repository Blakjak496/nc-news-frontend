import React from 'react';
import formatDate from './utils/utils';
import { BiHeart, BiTime, BiChat } from 'react-icons/bi';
import {Link} from '@reach/router';

const ArticleList = (props) => {
    
    return (
        <div className={props.class ? props.class.list : "articles__list"}>
                <span className="articles__filter-btn-box">
                    <p>sort</p>
                    <button className="articles__filter-btn" id="votes" onClick={props.sort}><BiHeart/></button>
                    <button className="articles__filter-btn" id="created_at" onClick={props.sort}><BiTime /> </button>
                    <button className="articles__filter-btn" id="comment_count" onClick={props.sort}><BiChat/> </button>
                </span>
                {props.articlesList.map(article => {
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
                                <p className="articles__article-footer--author">{article.author} </p>
                                <p className="articles__article-footer--counter"><BiChat/> {article.comment_count} </p>
                            </span>
                        </div>
                    )
                })}            
            </div>
    )
}

export default ArticleList;