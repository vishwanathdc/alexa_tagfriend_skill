const Alexa = require('ask-sdk-core');
const Utils = require('../../utils/utils.js');

const FriendIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'FriendIntent';
    },
    async handle(handlerInput) {
        console.log("inside friend intent")
        let speechText = "";
        let friendname = handlerInput.requestEnvelope.request.intent.slots.friendname.value;
        console.log("friendname: ", friendname);
        //speechText = "OK, I got your friend's name, now tell me an animal that you dont like.";
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let capturedanimalname = sessionAttributes.animalname;

        if(!Utils.isEmptyObject(capturedanimalname)){
            if(Utils.isVowel(capturedanimalname.charAt(0))){
                speechText = `${friendname} is an ${capturedanimalname}`;
            }
            else{
                speechText = `${friendname} is a ${capturedanimalname}`;
            }  
            sessionAttributes.friendname = "";
            sessionAttributes.animalname = "";
        }
        else{
            speechText = "I got your friend's name, now tell me an animal that you dont like.";
            sessionAttributes.friendname = friendname;
        }
        sessionAttributes.lastspeech = speechText;
        console.log("attributes: ", sessionAttributes);
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
        
        console.log(speechText);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard("tagfriend", speechText)
            .getResponse();
    },
};

module.exports = FriendIntentHandler;