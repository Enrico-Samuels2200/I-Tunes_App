import React from 'react';
import { Link } from 'react-router-dom';
import home from './images/home.png';
import trash from './images/trash.png';
import './styles/style.css';

export default class App extends React.Component {
  constructor() {
    super();

    this.state=({
        favList: []
    })
  }
  

  componentDidMount = () => { //Loads data once the component is mounted.
    this.fetchData() //Calls the function fetchData.
  }

  fetchData = async () => { //Retrievs data from the express app.
    try{
      const get = await fetch('/favourites') //Sends part of the url to the express app to retrieve specific data.
      const res = await get.json() //Converts the code recieved from the API from a string into json code. 
      this.setState({ //Sets the state.
        favList: res //Assign the returned value to 'data' in the state.
      })  
    }catch (error) {
      window.location.reload(false); //Reloads the page so data can reload until the api is recieved.
    }
  }

  /*----------------------------------------------------------------------------Fav List--------------------------------------------------------------------------------*/

  deleteItem = (event) => {
    const options = {
        method: "DELETE", //Use delete data in the express app.
        headers: {"Content-Type": "application/json"}, //specify that the file been sent is a json file.
        body: JSON.stringify(event) //Gets data from the state and then stringify the data so it may be passed to the express app.
    }; 

    fetch("/favourites", options) //Passes data to the express app with the header 'options'.
    this.fetchData() //Calls function to update the page with new data.
  }

  checkMedia = (value) => { //Allow for a parameter to be passed through the function.
    if(value.kind === "song") { //If any of the items returned is a song it'll return the audio element so the user can preview the music.
      return <audio src={value.previewUrl} controls/>
    }
  }

  render() {

    let displayFav =  this.state.favList.map( object =>  //Creates a map that will loop through an array of objects. For each object it'll return the code below.
      [
        <div className="displayItem">
          <img src={object.artworkUrl100}/>
          <p>{object.artistName} -</p>
          <br/> 
          <p>{object.trackName} </p>
          {this.checkMedia(object)}
          <br/>
          <a herf="#" onClick={() => this.deleteItem(object)}><img src={trash} alt="Trash can icon" className="customButton"/></a>
        </div>
      ]
    )
    return(
      <div>
        <div className="navBar">
          <h1>Your I Tunes favourites</h1>
          <a href={"/"} className="home"><img src={home} alt="Home icon"/></a>
          <br/>
        </div>
        <hr/>
        {displayFav}
      </div>
    )
  }
}