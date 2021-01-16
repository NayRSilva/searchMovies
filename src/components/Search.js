import React from 'react';
import '../Search.css';
import axios from 'axios';
import CardsResult from './CardsResult';
import Navigation from './Navigation';

class Search extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            query:'',
            results: {},
            loading: false,
            message: '',
            totalResults:0,
            totalPages:0,
            currentPage:0,
        };
        this.cancel = '';    
    }

    getPagesCount= (total, denominator)=>{
        let valuetoBeAdded = (total%denominator ===0)? 0:1;
        return Math.floor(total/denominator)+valuetoBeAdded;
    }
    handleOnInputChange = (event) => {
        const query = event.target.value;

        if(!query){
            this.setState({query, results:{}, message:''});
        }else{
            this.setState({query, loading:true, message:''},
            ()=>{
                this.fetchSearch(1, query);
            });
            
        }
                
    };

    renderSearchResults = () =>{
        // console.log("entramos")
        const{results}= this.state;
        // console.log(results)
        if( Object.keys(results).length && results.length){
        //   results.map((movie)=>{
        //       console.log(movie);
        //       console.log("ola\n");
        //   })

            return(
                <div className="dragMovies">
                    <CardsResult movies={results}/>
                </div>
            )
        }
    }
    handleClickPage =(type)=>{
        // e.preventDefault();
        let oldPage = this.state.currentPage;
        const updatedPageNumber =
            ('before'===type) ? (oldPage -1): (oldPage+1);
            if(!this.state.loading){
                this.setState({loading: true, message:''}, ()=>{
                    this.fetchSearch(updatedPageNumber, this.state.query);
                })
            }


    }
    fetchSearch = (updatedPageNumber= '', query) =>{
        
        let pageNumber = updatedPageNumber ? '&page='+updatedPageNumber+'':'';
        const searchUrl = 'http://www.omdbapi.com/?s='+query+pageNumber+'&apikey=c18f7920'
        if(this.cancel){
            this.cancel.cancel();
        }
        this.cancel= axios.CancelToken.source();
        axios.get(searchUrl,{
            CancelToken: this.cancel.token,
        }).then((res)=>{
            console.log("procura aqui")
            const total = res.data.totalResults;
            const notFoundresult=!res.data.Search.length ? "No searches found, try again":' ';
            console.log(total);
            const totalPagesCount = this.getPagesCount(total, 10);
            this.setState({
                results: res.data.Search,
                message: notFoundresult,
                loading: false,
                currentPage:updatedPageNumber,
                totalResults: total,
                totalPages: totalPagesCount,

                
            });
        }).catch((error)=>{
            if(axios.isCancel(error)|| error){
                this.setState({
                    loading:false,
                    message: 'Failed to fetch',
                });
            }
        });

    };
    render(){
            const{query, loading, message, totalResults, totalPages, currentPage}=this.state;

            const showPreviousPage= (currentPage>1)? true:false;
            // (currentPage>1)? alert("true"):false;
            // alert(currentPage, showPreviousPage);
            const showNextPage= (totalPages>currentPage)? true:false;

        return(
            <div className="container">
                <h2>Search your Movies</h2>
            <label className="searchField" htmlFor="search-input">
                <input
                type="text"
                id="search-input"
                value={query}
                placeholder="Your favourite movies..."
                onChange={this.handleOnInputChange}
                ></input>
                
                <i className="fa fa-search search-icon"/>


            </label>

            <div>
                <div class="result-container">
                <Navigation showPrevLink={showPreviousPage} showNextLink={showNextPage} handleNextPage={()=>this.handleClickPage('after')} handlelastPage={()=>this.handleClickPage('before')}/>
                {this.renderSearchResults()}
                <Navigation showPrevLink={showPreviousPage} showNextLink={showNextPage} handleNextPage={()=>this.handleClickPage('after')} handlelastPage={()=>this.handleClickPage('before')}/>
                </div>
            </div>
            </div>

        )
    }

}

export default Search;