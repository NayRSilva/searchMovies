import React from 'react';
import { Button } from '@material-ui/core';


function NominatedList(props) {
    // console.log(props.itemList)
    return (
        <div className="result-container">
            <h2>Nominated</h2>
        {props.itemList.map((nominations) => {
            return (
                <div key={nominations.key}>
                    <div className="CardBase">
                        <div className="textCard">
                            <h3>{nominations.itemName}</h3>
                            <h4>{nominations.itemYear}</h4>
                        </div>
                        <div className="buttonsCard">
                            <Button color="secondary" onClick={()=> props.rem(nominations.key)}>Remove</Button>

                        </div>

                    </div>
                    </div>

                    )
                })
            }
        </div>
    )

            // )
        }
        
export default NominatedList;