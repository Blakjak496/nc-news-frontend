import React, { useEffect, useState } from 'react';
import ErrorPage from './errors/ErrorPage';
import Loader from './Loader';
import { getArticle, getComments } from './utils/api';
import ArticleCard from './ArticleCard';
import CommentsCard from './CommentsCard';

const Article = ({article_id, user}) => {
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [errorCode, setErrorCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    

    useEffect(() => {
        
        
        getArticle({
            article_id,
            setArticle,
            setIsLoading,
            setErrorCode
        });
    
        getComments({
            article_id,
            setComments,
            setIsLoading,
            setErrorCode
        });
    }, [article_id, user])

    

    if (isLoading) return <Loader loading={isLoading} />
    if (errorCode) return <ErrorPage code={errorCode} />
    else return (
        <div className="article__container">
            <div className="article__page-header">
                <h2>Some Title</h2>
            </div>
            <div className="article__article-wrapper">
                <ArticleCard article={article} setErrorCode={setErrorCode} />
                <CommentsCard article_id={article_id} user={user} comments={comments} />
            </div>
        </div>   
    )
}

export default Article;