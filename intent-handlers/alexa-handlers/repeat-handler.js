const Alexa = require('ask-sdk-core');

const AMAZON_RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speechText = sessionAttributes.lastspeech;
        let reprompt = sessionAttributes.lastspeech;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard('repeat', speechText)
            .getResponse();
    },
};

module.exports = AMAZON_RepeatIntentHandler;