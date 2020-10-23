import React, { useEffect, useState } from 'react';
import {BiHeart, BiUpArrow, BiDownArrow} from 'react-icons/bi';
import { incVote } from './utils/api';

//Still working on changing it to only allow 1 vote
const Vote = (props) => {
    const [voteCount, setVoteCount] = useState(0);
    const [votedUp, setVotedUp] = useState([]);
    const [votedDown, setVotedDown] = useState([]);

    const checkVoted = (username) => username === props.user;
    console.log(votedUp, votedDown)
    useEffect(() => {
        setVoteCount(props.count);
        
    }, [props, votedUp, votedDown])

    const handleVote = (event) => {
        if (props.user) {

            const increment = Number(event.target.value);
            const parentId = props.parentId;
            const handleError = props.handleError;
            const isArticle = props.isArticle;
    
            if (increment > 0) {
                if (!votedUp.some(checkVoted)) {
                    incVote({
                        isArticle,
                        parentId,
                        increment,
                        setVoteCount,
                        voteCount,
                        handleError
                    })
                    const newVoteList = [...votedUp, props.user];
                    setVotedUp(newVoteList);              
                }
            }
            else {
                if (!votedDown.some(checkVoted)) {
                    incVote({
                        isArticle,
                        parentId,
                        increment,
                        setVoteCount,
                        voteCount,
                        handleError
                    })
                    const newVoteList = [...votedDown, props.user];
                    setVotedDown(newVoteList); 
                }
            }
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