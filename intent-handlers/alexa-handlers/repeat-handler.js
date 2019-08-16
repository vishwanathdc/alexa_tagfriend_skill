const Alexa = require('ask-sdk-core');


const AMAZON_RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        let speechText = "nothing to repeat"
        let reprompt = "nothing to repeat"
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard('Help', speechText)
            .getResponse();
    },
};

module.exports = AMAZON_RepeatIntentHandler;