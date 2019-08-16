/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('ask-sdk-core');

//
//  Imported Alexa Hanlders
//
const AMAZON_LaunchRequestHandler = require('./intent-handlers/alexa-handlers/launch-handler.js');
const AMAZON_HelpIntentHandler = require('./intent-handlers/alexa-handlers/help-handler.js');
const AMAZON_CancelAndStopIntentHandler = require('./intent-handlers/alexa-handlers/cancel-and-stop-handler.js');
const AMAZON_SessionEndedRequestHandler = require('./intent-handlers/alexa-handlers/session-ended-handler.js');
const AMAZON_ErrorHandler = require('./intent-handlers/alexa-handlers/error-handler.js');
const AMAZON_FallbackIntentHandler = require('./intent-handlers/alexa-handlers/fallback-handler.js');
const AMAZON_RepeatIntentHandler = require('./intent-handlers/alexa-handlers/repeat-handler.js');

//
const FriendIntentHandler = require('./intent-handlers/friend-animal-handlers/friend-handler.js');
const AnimalIntentHandler = require('./intent-handlers/friend-animal-handlers/animal-handler.js');


//
//  Export Hanlders
//
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    AMAZON_LaunchRequestHandler,
    AMAZON_RepeatIntentHandler,
    
    FriendIntentHandler,
    AnimalIntentHandler,
    
    AMAZON_HelpIntentHandler,
    AMAZON_CancelAndStopIntentHandler,
    AMAZON_SessionEndedRequestHandler,
    AMAZON_FallbackIntentHandler
  )
  .addErrorHandlers(AMAZON_ErrorHandler)
  .lambda();