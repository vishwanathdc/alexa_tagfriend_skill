const Alexa = require('ask-sdk-core');

const AMAZON_ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {

        let errorMessage = "sorry, something went wrong";
        let reprompt = "sorry, something went wrong";

        return handlerInput.responseBuilder
            .speak(errorMessage)
            .reprompt(reprompt)
            .withSimpleCard('Sorry ¯\_(ツ)_/¯', errorMessage)
            .getResponse();
    },
};

module.exports = AMAZON_ErrorHandler;