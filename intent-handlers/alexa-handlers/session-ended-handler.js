const Alexa = require('ask-sdk-core');

const AMAZON_SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended`);
        return handlerInput.responseBuilder.getResponse();
    },
};

module.exports = AMAZON_SessionEndedRequestHandler;