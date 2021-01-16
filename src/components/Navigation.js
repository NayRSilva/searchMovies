import React from 'react';

function Navigation (props){
    const{
        showPrevLink,
        showNextLink, 
        handleNextPage,
        handlelastPage,
        loading

    }=props;
    // alert(showNextLink);    
    const visibilityLast = (showPrevLink===true)? 'show':'hide';
    const greyed= (loading)? 'greyed-out':'';
    const visibilityNext= (showNextLink)? 'show':'hide';


    return(
        <div className="nav-link-container">

            <a href="#"
            className={
                'nav-link '+ visibilityLast +' '+ greyed+' '
            } onClick={handlelastPage}>Previous</a>
                        <a href="#"
            className={
                'nav-link '+ visibilityNext +' '+ greyed+' '
            } onClick={handleNextPage}>Next</a>

        </div>

    )

}

export default Navigation;