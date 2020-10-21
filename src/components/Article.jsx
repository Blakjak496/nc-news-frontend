import React, { useEffect, useState } from 'react';
import axios from 'axios';
import formatDate from './utils/utils';
import {BiCookie, BiFootball, BiCode, BiHeart, BiChat} from 'react-icons/bi';
import Vote from './Vote';

const Article = (props) => {
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    const articleDate = formatDate(article.created_at);

    useEffect(() => {
        axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles/${props.article_id}`)
            .then(({data}) => {
                const newArticle = {...data.article};
                switch(newArticle.topic) {
                    case 'cooking':
                        newArticle.topicIcon = BiCookie;
                        break;
                    case 'football':
                        newArticle.topicIcon = BiFootball;
                        break;
                    case 'coding':
                        newArticle.topicIcon = BiCode;
                        break;
                    default:
                        break;
                }
                setArticle(newArticle);
            })

        axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles/${props.article_id}/comments`)
            .then(({data}) => {
                setComments(data.comments);
            })

    }, [props])

    const postComment = (event) => {
        console.log(props)
        axios.post(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles/${props.article_id}/comments`, {
            body: commentText,
            username: props.user
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const inputChange = (event) => {
        setCommentText(event.target.value);
    }

    console.log(commentText)
    
    return (
        <div className="article__container">
            <div className="article__page-header">
                <h2>Some Title</h2>
            </div>
            <div className="article__article-wrapper">
                <div className="article__article-content">
                    <span className="articles__article-header">
                        <p className="articles__article-header--topic">{article.topicIcon ? <article.topicIcon/> : null} {article.topic} </p>
                        <p className="articles__article-header--created">{articleDate} </p>
                        <Vote count={article.votes} isArticle={true} parentId={article.article_id} />
                    </span>
                    <span className="article__article-body">
                        <p>{article.body} </p>
                    </span>
                    <span className="articles__article-footer">
                        <p className="articles__article-footer--counter"><BiChat/> {article.comment_count} </p>
                    </span>
                </div>
                <div className="article__comments--wrapper">
                    <div className="article__comments--post">
                        <p>Post a comment</p>
                        <span className="article__comments-input-box">
                            <input className="article__comments-input" type="text" name="post-comment" id="commentInput" placeholder="comment" onChange={inputChange} />
                            <button className="article__comments-input-btn" onClick={postComment}>Post</button>
                        </span>

                    </div>
                    <div className="article__comments--list">
                        {comments.map(comment => {
                            const commentDate = formatDate(comment.created_at)
                        return (
                        <div key={comment.comment_id} className="article__comment">
                            <span className="articles__article-header">
                                <p className="articles__article-header--topic">{comment.author} </p>
                                <p className="articles__article-header--created">{commentDate} </p>
                            </span>
                            <span>
                                {comment.body}
                            </span>
                            <span className="articles__article-footer">
                                <Vote count={comment.votes} isArticle={false} parentId={comment.comment_id} />
                            </span>
                        </div>
                        )
                        })}
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Article;