import React from 'react';
import {Link} from '@reach/router';

const Navbar = (props) => {

    const userBtnText = () => {
        if (props.loggedIn) return 'Logout';
        else return 'Sign In';       
    }

    return (
        <div className="navbar__container">
            <ul className="navbar__links">
                <Link className="navbar__btn" to="/">Home</Link>
                <Link className="navbar__btn" to="/topics">Topics</Link>{/* This will eventually be a dropdown button */}
                <Link className="navbar__btn" to="/">Articles</Link>
            </ul>
            <button className="navbar__user-btn" onClick={props.login}>{userBtnText()} </button>
        </div>
    )
}

export default Navbar;