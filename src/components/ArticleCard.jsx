import React from 'react';
import Vote from './Vote';
import formatDate from './utils/utils';
import { BiChat } from 'react-icons/bi';

const ArticleCard = ({article, setErrorCode}) => {

    const articleDate = formatDate(article.created_at);

    return (
        <div className="article__article-content">
                <span className="articles__article-header">
                    <p className="articles__article-header--topic">{article.topicIcon ? <article.topicIcon/> : null} {article.topic} </p>
                    <p className="articles__article-header--created">{articleDate} </p>
                    <Vote count={article.votes} isArticle={true} parentId={article.article_id} handleError={setErrorCode} />
                </span>
                <span className="article__article-body">
                    <p>{article.body} </p>
                </span>
                <span className="articles__article-footer">
                    <p className="articles__article-footer--author">{article.author} </p>
                    <p className="articles__article-footer--counter"><BiChat/> {article.comment_count} </p>
                </span>
        </div>
    )
}

export default ArticleCard;