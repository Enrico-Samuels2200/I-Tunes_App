import React from 'react';  
import Discover from '../routes/iTunesDiscover.js';  
import renderer from 'react-test-renderer';

test('renders correctly', () => {    
    let com = renderer.create(<Discover/>)     
    let tree = com.toJSON();   
    expect(tree).toMatchSnapshot();  
})