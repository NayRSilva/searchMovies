import React from 'react';
import { Button } from '@material-ui/core';

function CardMovie(props){
    // let funci= props.func;
    let present= false;
    let butao;

    if((props.nominations.some(nom=> nom.itemName===props.name))&&((props.nominations.some(nom=> nom.itemYear===props.year)))){
        present=true;
    }
    if(present){
        butao= <Button color="primary" onClick={()=> props.func(props.name, props.year)} disabled="true" >Nominate</Button>
    } else{
        butao =<Button color="primary" onClick={()=> props.func(props.name, props.year)} >Nominate</Button>
    }
    return(
        <div className="CardBase">
            <div className="textCard">
            <h3>{props.name}</h3>
            <h4>{props.year}</h4>
            </div>
            <div className="buttonsCard">
               {butao}


            </div>

        </div>
    )
}

export default CardMovie;