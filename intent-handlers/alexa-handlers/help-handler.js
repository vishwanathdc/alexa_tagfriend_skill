const Alexa = require('ask-sdk-core');

const AMAZON_HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = "tell me your friend's name."
        const reprompt = "tell me your friend's name."

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard('Help', speechText)
            .getResponse();
    },
};

module.exports = AMAZON_HelpIntentHandler;