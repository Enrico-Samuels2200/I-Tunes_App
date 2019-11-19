const fetch = require('node-fetch'); //Imports the tax module.
const chai = require('chai'); //Requires chai module.
const assert = chai.assert;

describe("Testing if the API works properly.", () => { //Creates a function.
    it("Retrives the data.", async () => {
        const get = await fetch("https://itunes.apple.com/search?term=loneliness&media=music&limit=1")
        const res = await get.json()
        assert.equal(res.results[0].trackName, "Heaven Subculture"); //Compares the expected amount to the calculated amount and outputs whether or not the code works.
    });
});