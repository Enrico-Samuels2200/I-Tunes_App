import React from 'react';
import { Link } from 'react-router-dom';
import star from './images/star.png';
import './styles/style.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      data: [],
      title: "",
      type: ""
    })
  }

  componentDidMount = () => { //Loads data once the component is mounted.
    this.fetchData() //Calls the function fetchData.
  }

  fetchData = async () => { //Retrievs data from the express app.
    try{
      const get = await fetch(`/media/?name=${this.state.title}&type=${this.state.type}`) //Sends part of the url to the express app to retrieve specific data.
      const res = await get.json() //Converts the code recieved from the API from a string into json code. 
      
      this.setState({ //Sets the state.
        data: res.results //Assign the returned value to 'data' in the state.
      })
    }catch (error) {
      window.location.reload(false); //Reloads the page so data can reload until the api is recieved.
    }
  }

  setTitle = (event) => { //Allow for a parameter to be passed through the function.
    this.setState({
      title: event //Assign the value the user entered to 'title' in the state.
    })
  }

  setType = (event) => { //Allow for a parameter to be passed through the function.
    this.setState({
      type: event //Assign the value the user entered to 'title' in the state.
    })
  }

  addFav = (event) => { //Allow for a parameter to be passed through the function.
    const options = {
      method: "POST", //Use post to send data to the express app.
      headers: {"Content-Type": "application/json"}, //specify that the file been sent is a json file.
      body: JSON.stringify(event) //Gets data from the passed parameters and then stringify the data so it may be passed to the express app.
    };

    fetch("/media", options) //Passes data to the express app with the header 'options'.
    alert(`${event.artistName}-${event.trackName}, was added to your favourites list.`) //Alerts user that their request was done correctly.
  }

  checkMedia = (value) => { //Allow for a parameter to be passed through the function.
    if(value.kind === "song") { //If any of the items returned is a song it'll return the audio element so the user can preview the music.
      return <audio src={value.previewUrl} controls/>
    }
  }

  render() {
    let displayProjects =  this.state.data.map( object =>  //Creates a map that will loop through an array of objects. For each object it'll return the code below.
      [
        <div className="displayItem">
          <img src={object.artworkUrl100}/> {/*Returns the image of the object.*/}
          <p className="artistName">{object.artistName} -</p> {/*Returnscthe artist name.*/}
          <br/> 
          <p className="trackName">{object.trackName} </p> {/*Returns the items name.*/}
          {this.checkMedia(object)}
          <br/>
          <a href="#" onClick={() => this.addFav(object)}><img src={star} alt="Favourite icon" className="customButton"/></a> {/*Adds the item to the users favourite list.*/}
        </div>
      ]
    )
    return(
      <div>
        <div className="navBar">
          <h1>I Tunes Search Engine</h1>
          <input placeholder="Enter title here" onChange={(val) => this.setTitle(val.target.value)} name="artistName" autoComplete="off"/>
          <select onChange={(val) => this.setType(val.target.value)} className="typePick"> {/*Getsthe type of data the user wishes to recieve.*/}
            <option value="all">all</option>
            <option value="music">music</option>
            <option value="audio book">audio book</option>
            <option value="ebook">ebook</option>
          </select>
          <button onClick={() => this.fetchData()}>Search</button>
          <a href={"./favourites"} className="icon"><img src={star} alt="Star icon"/></a> {/*Link to go to the users favourite list.*/}
          <br/>
        </div>
        <hr/>
        {displayProjects}
      </div>
    )
  }
}