import React from 'react';
import CirlceLoader from 'react-spinners/CircleLoader';

const Loader = (props) => {
    return (
        <div className="loader__container">
            <CirlceLoader loading={props.loading} size={'25vmin'} color={' #ba1f31'}/>
            <p>Rummaging around...</p>
        </div>
    )
}

export default Loader;