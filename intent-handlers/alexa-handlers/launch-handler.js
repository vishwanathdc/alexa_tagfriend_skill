const Alexa = require('ask-sdk-core');

const AMAZON_LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = "welcome to tag friend, tell me your friend's name";
        let reprompt = "tell me your friend's name";
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.friendname = "";
        sessionAttributes.animalname = "";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        console.log(sessionAttributes);
        console.log(speechText);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard("tagfriend", speechText)
            .getResponse();
    },
};

module.exports = AMAZON_LaunchRequestHandler; 