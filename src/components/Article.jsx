import React, { useEffect, useState, useContext } from 'react';
import ErrorPage from './errors/ErrorPage';
import Loader from './Loader';
import { getArticle, getComments } from './utils/api';
import ArticleCard from './ArticleCard';
import CommentsCard from './CommentsCard';
import UserContext from './UserContext';

const Article = ({article_id}) => {
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [errorCode, setErrorCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const user = useContext(UserContext)

    

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
    }, [article_id])

    

    if (isLoading) return <Loader loading={isLoading} />
    if (errorCode) return <ErrorPage code={errorCode} />
    else return (
        <div className="article__container">
            <div className="article__page-header">
                <h2>{article.title}</h2>
            </div>
            <div className="article__article-wrapper">
                <ArticleCard article={article} setErrorCode={setErrorCode} />
                <CommentsCard article_id={article_id} comments={comments} setComments={setComments} />
            </div>
        </div>   
    )
}

export default Article;