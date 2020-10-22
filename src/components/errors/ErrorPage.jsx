import React from 'react';
import {BiError} from 'react-icons/bi';

const ErrorPage = (props) => {

    if (props.code === 404) {
        return (
            <div className="error__container">
                <div className="error__content">
                    <h1>Rats! <br/> Looks like that page doesn't exist...</h1>
                    <BiError size={'25vmin'} />
                </div>
            </div>
        )
    }
    if (props.code === 400) {
        return (
            <div className="error__container">
                <div className="error__content">
                    <h1>Woops! <br/> An article ID should be a number. Check the URL and try again</h1>
                    <BiError size={'25vmin'} />
                </div>
            </div>
        )
    }
}

export default ErrorPage;