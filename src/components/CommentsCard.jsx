import React, {useState} from 'react';
import { postComment as postNewComment, delComment } from './utils/api';
import formatDate from './utils/utils';
import Vote from './Vote';


const CommentsCard = ({
    comments,
    setComments,
    setErrorCode,
    user,
    article_id,

}) => {
    const [commentText, setCommentText] = useState('');

    const postComment = (event) => {
        const inputBox = event.target.previousSibling;
        if (commentText && user) {
            postNewComment({
                article_id,
                commentText,
                user,
                comments,
                inputBox,
                setComments,
                setErrorCode
            })
        } else {
            if (!commentText) event.target.previousSibling.classList.add('article__comments-input--invalid');
            if (!user) alert('You must be logged in to post a comment');
        }
        
    }

    const inputChange = (event) => {
        if (event.target.value) event.target.classList.remove('article__comments-input--invalid')
        setCommentText(event.target.value);
    }

    const deleteComment = (event) => {
        const id = Number(event.target.id);
        delComment({
            id,
            comments,
            setComments,
            setErrorCode
        })
    }

    return (
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
                                        <Vote count={comment.votes} isArticle={false} parentId={comment.comment_id} handleError={setErrorCode} />
                                        {comment.author === user ? <button id={comment.comment_id} onClick={deleteComment}>Delete</button> : null}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
    )
}

export default CommentsCard;