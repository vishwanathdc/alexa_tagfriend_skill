const Alexa = require('ask-sdk-core');
const Utils = require('../../utils/utils.js');

const AnimalIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AnimalIntent';
    },
    async handle(handlerInput) {
        console.log("inside animal intent")
        let speechText = "";
        let capturedfriendname = "";
        let animalname = handlerInput.requestEnvelope.request.intent.slots.animalname.value;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        capturedfriendname = sessionAttributes.friendname;
        if(!Utils.isEmptyObject(capturedfriendname)){
            if(Utils.isVowel(animalname.charAt(0))){
                speechText = `${capturedfriendname} is an ${animalname}`;
            }
            else{
                speechText = `${capturedfriendname} is a ${animalname}`;
            }
            sessionAttributes.friendname = "";
            sessionAttributes.animalname = "";
        }
        else{
            speechText = "OK, now tell me your friend's name";
            sessionAttributes.animalname = animalname;
        }
        sessionAttributes.lastspeech = speechText;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
        console.log(speechText);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard("tagfriend", speechText)
            .getResponse();
    },
};

module.exports = AnimalIntentHandler;