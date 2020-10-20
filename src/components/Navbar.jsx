import React from 'react';

const Navbar = (props) => {

    const userBtnText = () => {
        if (props.loggedIn) return 'Logout';
        else return 'Sign In';       
    }

    return (
        <div className="Navbar__container">
            <ul className="Navbar__links">
                <li className="Navbar__btn">Home</li>
                <li className="Navbar__btn">Articles</li>
                <li className="Navbar__btn">Topics</li>{/* This will eventually be a dropdown button */}
            </ul>
            <button className="Navbar__user-btn">{userBtnText()} </button>
        </div>
    )
}

export default Navbar;