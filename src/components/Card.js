import React from 'react';

function CardMovie(props){
    return(
        <div>
            <h1>{props.name}</h1>
            <h1>{props.year}</h1>

        </div>
    )
}

export default CardMovie;