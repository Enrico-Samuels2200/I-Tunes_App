import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom' //Switch(allows for multiple paths.) Redirect(allows for redircting if certain values are inputted)

//Imports the webpages to this js file
import Landing from './iTunesDiscover';
import favList from './favouritesList';

//Allows for the webpages to be called on by the use of the words in "path='/'"
export default() => (
    <BrowserRouter>
        <Switch> 
            <Route path="/" exact component={ Landing } />
            <Route path="/favourites" exact component={ favList } />
        </Switch>
    </BrowserRouter>
)
