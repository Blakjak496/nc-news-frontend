import React, { useEffect, useState } from 'react';
import {BiHeart, BiUpArrow, BiDownArrow} from 'react-icons/bi';
import { incVote } from './utils/api';

const Vote = (props) => {
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        setVoteCount(props.count);
    }, [props])

    const handleVote = (event) => {
        const increment = Number(event.target.value);
        const parentId = props.parentId;
        const handleError = props.handleError;
        const isArticle = props.isArticle;
        incVote({
            isArticle,
            parentId,
            increment,
            setVoteCount,
            voteCount,
            handleError
        })
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