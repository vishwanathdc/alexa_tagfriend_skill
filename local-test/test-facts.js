const Constants = require('../utils/Constants.js');

function testNewFact() {

    let speechText = Constants.ERROR_MESSAGE;

    // Create list of indexes that correspond to the facts array
    let indexArr = Constants.FACTS.map(function (val, index) {
        return index
    })

    console.log(indexArr);

    speechText = 'Here\'s your fact, ' + Constants.FACTS[Math.floor(Math.random() * Constants.FACTS.length)];
    let reprompt = Constants.FALLBACK_REPROMPT;

    //console.log(speechText);
}

testNewFact(); 