import React from 'react';
import {Link} from '@reach/router';

const Navbar = (props) => {

    const userBtnText = () => {
        if (props.loggedIn) return 'Logout';
        else return 'Sign In';       
    }

    const setActive = (event) => {
        const buttons = Array.from(event.target.parentElement.children);
        buttons.forEach(button => {
            if (button !== event.target) button.classList.remove('navbar__btn--active');
            else button.classList.add('navbar__btn--active');
        });
    }

    return (
        <div className="navbar__container">
            <ul className="navbar__links">
                <Link onClick={setActive} className="navbar__btn navbar__btn--active" to="/">Home</Link>
                <Link onClick={setActive} className="navbar__btn" to="/topics">Topics</Link>{/* This will eventually be a dropdown button */}
                <Link onClick={setActive} className="navbar__btn" to="/">Articles</Link>
            </ul>
            <button className="navbar__user-btn" onClick={props.login}>{userBtnText()} </button>
        </div>
    )
}

export default Navbar;