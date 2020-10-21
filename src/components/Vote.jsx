import React, { useEffect, useState } from 'react';
import {BiHeart, BiUpArrow, BiDownArrow} from 'react-icons/bi';
import axios from 'axios';

const Vote = (props) => {
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        setVoteCount(props.count);
    }, [props])

    const handleVote = (event) => {
        const increment = Number(event.target.value);
        
        if (props.isArticle) {
            axios.patch(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles/${props.parentId}`, {
                inc_votes: increment,
            })
            .then((res) => {
                console.log(res);
                setVoteCount(voteCount + increment);
            })
        }
        else {
            axios.patch(`https://blakjak-nc-news-basic-api.herokuapp.com/api/comments/${props.parentId}`, {
                inc_votes: increment,
            })
            .then((res) => {
                setVoteCount(voteCount + increment);
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div className="vote__container">
            <span className="vote__btn-box">
                <button className="articles__filter-btn" onClick={handleVote} value={1}>
                    <BiUpArrow className="articles__filter-btn--icon" />
                </button>
                <BiHeart className="vote__icon" />{voteCount}
                <button className="articles__filter-btn" onClick={handleVote} value={-1}>
                    <BiDownArrow className="articles__filter-btn--icon" />
                </button>
            </span>
        </div>
    )

}

export default Vote;