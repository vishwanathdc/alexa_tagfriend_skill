const Alexa = require('ask-sdk-core');

const AMAZON_FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {

        const speechText = "sorry, something went wrong";
        const reprompt = "sorry, something went wrong";

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard("tagfriend", speechText)
            .getResponse();
    },
};

module.exports = AMAZON_FallbackIntentHandler;