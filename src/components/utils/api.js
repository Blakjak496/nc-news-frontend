import axios from 'axios';
import { BiCookie, BiFootball, BiCode,} from 'react-icons/bi';

const getArticles = ({orderAsc, topic, sortBy, setArticlesList, setErrorCode, setIsLoading}) => {
    const order = orderAsc ? 'asc':'desc';
    axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles`, {
            params: {
                topic,
                sort_by: sortBy,
                order: order
            }
        })
        .then(({data}) => {
            
            const arr = data.articles.map(article => {
                switch(article.topic) {
                    case 'cooking':
                        article.topicIcon = BiCookie;
                        break;
                    case 'football':
                        article.topicIcon = BiFootball;
                        break;
                    case 'coding':
                        article.topicIcon = BiCode;
                        break;
                    default:
                        break;
                }
                return article;
            })
            setArticlesList(arr);
            setIsLoading(false);
        })
        .catch(({response}) => {
            setErrorCode(response.status);
            setIsLoading(false);
        })
}

const getArticle = ({
    article_id,
    setArticle,
    setIsLoading,
    setErrorCode
}) => {
    axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles/${article_id}`)
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
                setIsLoading(false);
            })
            .catch(({response}) => {
                setErrorCode(response.status);
                setIsLoading(false);
            })
}

const getComments = ({
    article_id,
    setComments,
    setIsLoading,
    setErrorCode
}) => {
    axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles/${article_id}/comments`)
            .then(({data}) => {
                setComments(data.comments);
                setIsLoading(false);
            })
            .catch(({response}) => {
                setErrorCode(response.status);
                setIsLoading(false);
             })
}

const postComment = ({
    article_id,
    commentText,
    user,
    comments,
    inputBox,
    setComments,
    setErrorCode
}) => {
    axios.post(`https://blakjak-nc-news-basic-api.herokuapp.com/api/articles/${article_id}/comments`, {
                body: commentText,
                username: user
            })
            .then(({data}) => {
                const newList = [...comments];
                newList.unshift(data.comment);
                setComments(newList);
                inputBox.value = '';
            })
            .catch((err) => {
                console.log(err)
                // setErrorCode(response.status);
            })
}

const delComment = ({
    id,
    comments,
    setComments,
    setErrorCode
}) => {
    axios.delete(`https://blakjak-nc-news-basic-api.herokuapp.com/api/comments/${id}`)
        .then((res) => {
            const newList = [...comments];
            let i;
            newList.forEach((comment, index) => {
                if (comment.comment_id === id) i = index;
            })
            newList.splice(i, 1);
            setComments(newList);
        })
        .catch(({response}) => {
            setErrorCode(response.status)
        })
}

const incVote = ({
    type,
    parentId,
    increment,
    setVoteCount,
    voteCount,
    handleError
}) => {
        axios.patch(`https://blakjak-nc-news-basic-api.herokuapp.com/api/${type}/${parentId}`, {
            inc_votes: increment,
        })
        .then((res) => {
            setVoteCount(voteCount + increment);
        })
        .catch(({response}) => {
            handleError(response.status);
        })
}

const getTopics = ({
    setTopicsList,
    setIsLoading,
    setErrorCode
}) => {
    axios.get(`https://blakjak-nc-news-basic-api.herokuapp.com/api/topics`)
        .then(({data}) => {
            const newList = data.topics.map((topic) => {
                const newTopic = {...topic};
                switch(newTopic.slug) {
                    case 'cooking':
                        newTopic.icon = BiCookie;
                        break;
                    case 'football':
                        newTopic.icon = BiFootball;
                        break;
                    case 'coding':
                        newTopic.icon = BiCode;
                        break;
                    default:
                        break;
                }
                return newTopic
            })
            setTopicsList(newList);
            setIsLoading(false)
        })
        .catch(({response}) => {
            setErrorCode(response.status)
        })
}

export {
    getArticles,
    getArticle,
    getComments,
    postComment,
    delComment,
    incVote,
    getTopics
};