import React from 'react';
import CardMovie from './Card';


function CardsResult(props){
    // console.log(props.movies)

    return (
        props.movies.map((movie)=>{
            return(
                <div>
                <CardMovie name={movie.Title} year={movie.Year} func={props.addi} nominations={props.nominations}/>

                </div>
            )
        })
    )
}


export default CardsResult;