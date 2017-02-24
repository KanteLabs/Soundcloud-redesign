import React, { Component } from 'react';
import SC from 'soundcloud';
import handleLoginClick from './login';
import {search, genreName, client_id, client_secret, getImageUrl, IMAGE_SIZES, handleGenreClick, handleLatestTracksClick, handleTrackPlay } from './config';
import '../search2.css';
import 'isomorphic-fetch';
import 'whatwg-fetch';

SC.initialize({client_id: client_id});
    var stream;

class Search extends Component{

    constructor(props){
        super(props);
        
        //trackInfo will hold the names of the songs, and metadata as well
        this.state = {
        	value: '',
            trackInfo: []
        };

        //Handles pressing the enter key
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    };    

    //This autoload tracks so that the page is not blank
    componentDidMount(){
        fetch(search + "Chance the Rapper", { method:"GET" })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(trackInfo => {   
            //json.map(entity => tracks.push(entity.title))
            this.setState({ trackInfo: trackInfo })   
        })
        .catch(error => console.log(error))
    };
    
    handleChange(event){
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    //This Function handles when a user presses the 'Enter' key
    //If this.state.value has a value then the function will call handleSearchSubmit, else it will do nothing
    handleOnKeyPress = (event) => {
    	if(event.charCode === 13){    		
    		this.state.value !== "" ? event.preventDefault(this.handleSearchSubmit()) : event.preventDefault();
    		event.preventDefault();  
    	}
    }

    handleSearchSubmit(){
        event.preventDefault();

        // Using arrow functions for readability
        if(this.state.value !== ""){        	
    		fetch(search + this.state.value, { method:"GET" })
        	.then(response => response.json())
        	.catch(error => console.log(error))
        	.then(trackInfo => {
                this.setState({trackInfo: trackInfo})
        	})
        	.catch(error => console.log(error))
        }event.preventDefault();
    };

    handleLatestTracksClick(){
        handleLatestTracksClick.call(this)
    };

    //This will search for the genre tag by using the function provided in the config file
    handleGenreCall(event){
        handleGenreClick.call(this, event);
    };

    handleTrackCall(event){
        handleTrackPlay.call(this, event);
    };
    handleLoginClick() {
        SC.initialize({
        client_id: client_id,
        redirect_uri: 'https://kantelabs.github.io/KanteCloud/callback.html',
        oauth_token: ""
        });

        // initiate auth popup
        SC.connect().then(function() {
            return SC.get('/me');
        }).then(function(me) {
        prompt('Hello, ' + me.username);
        });
    }

    render(){
        // Desctructuring the state
        const {trackInfo } = this.state;

        return(
            <div className="searchApp">
                <div className="navbar">                    
                    <div className="genreList">
                        <a className="loginItem" onClick={() =>this.handleLoginClick()}>Login</a>
                        <a className="genreItem active" name={genreName[0]} onClick={ event =>this.handleGenreCall(event)}>Pop</a>
                        <a className="genreItem" name={genreName[1]} onClick={ event =>this.handleGenreCall(event)}>Hip-Hop</a>
                        <a className="genreItem" name={genreName[2]} onClick={ event =>this.handleGenreCall(event)}>Reggae</a>
                        <a className="genreItem" name={genreName[2]} onClick={ event =>this.handleGenreCall(event)}>Reggae</a>
                        <a className="genreItem" name={genreName[3]} onClick={ event =>this.handleGenreCall(event)}>R&B</a>
                        <a className="genreItem" name={genreName[4]} onClick={ event =>this.handleGenreCall(event)}>EDM</a>
                        <a className="genreItem" name={genreName[5]} onClick={ event =>this.handleGenreCall(event)}>Dubstep</a>
                        <input className="textInput" type="text" value={this.state.value} placeholder="Search" onChange={event => this.handleChange(event)} onKeyPress={this.handleOnKeyPress} />
                        <a className="navItem" type="button" onClick={() => this.handleSearchSubmit()}>Search</a>
                        <a className="navItem" type="button" onClick={() => this.handleLatestTracksClick()}>Latest</a>            
                    </div>
                </div>
                <div id="trackViewer">
                     <ul className="trackGallery">{trackInfo.map(this.renderTrack)}</ul>
                </div>
            </div>
        )
    }
    //This configures what should be loaded from a search query
    renderTrack({id, user_id, title, artwork_url, permalink_url, stream_url,user}){
        function  handleTrackCall(event){
            return(
                <audio controls preload="none"><source src={'https://api.soundcloud.com/tracks/'+id+'/stream?format=json&client_id=0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2'} type="audio/mpeg"/> </audio>
            )
        }

        return( 
            <li key={id}>
                <div className="trackDetails">
                    <div className="trackImg" style={{backgroundImage: `url(${getImageUrl(artwork_url, IMAGE_SIZES.XLARGE)})`}}>
                        <div className="overlay" name={id} onClick={ event=>handleTrackCall(event)}>
                            <p className="playIcon">&#9654;</p>
                        </div>
                    </div>
                    <div className="trackText">
                        <img className="userAvatar" src={user.avatar_url } alt=""/>
                        <a href="#trackProfile" className="songTitle">{title}</a>
                        <a href={'http://api.soundcloud.com/users/3207?client_id='+ client_id} className="userName">{user.username}</a>
                    </div>
                    <audio controls preload="none"><source src={'https://api.soundcloud.com/tracks/'+id+'/stream?format=json&client_id=0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2'} type="audio/mpeg"/> </audio>
                </div>
            </li>
        )
    }
    
};

export default Search;
//&#9654;<audio controls><source src={'https://api.soundcloud.com/tracks/'+id+'/stream?format=json&client_id=0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2'} type="audio/mpeg"/> </audio>