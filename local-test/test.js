const moment = require('moment-timezone');
isVowel = function(x) {
    if(x == "a" || x == "e" || x == "i" || x == "o" || x == "o"){
      return true;
    }
    else{
      return false;
    }
  }
let speechText = "";
let capturedanimalname = "owl";
let capturedfriendname = "suraj";
if(isVowel(capturedanimalname.charAt(0))){
    speechText = `${capturedfriendname} is an ${capturedanimalname}`;
}
else{
    speechText = `${capturedfriendname} is a ${capturedanimalname}`;
}

console.log(speechText);