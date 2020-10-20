import React from 'react';

const Navbar = (props) => {

    const userBtnText = () => {
        if (props.loggedIn) return 'Logout';
        else return 'Sign In';       
    }

    return (
        <div className="navbar__container">
            <ul className="navbar__links">
                <li className="navbar__btn">Home</li>
                <li className="navbar__btn">Articles</li>
                <li className="navbar__btn">Topics</li>{/* This will eventually be a dropdown button */}
            </ul>
            <button className="navbar__user-btn">{userBtnText()} </button>
        </div>
    )
}

export default Navbar;