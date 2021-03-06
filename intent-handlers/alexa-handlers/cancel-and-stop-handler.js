const Alexa = require('ask-sdk-core');

const AMAZON_CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = "goodbye!";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(speechText, 'Have a great day!')
            .getResponse();
    },
};

module.exports = AMAZON_CancelAndStopIntentHandler;