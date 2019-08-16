const diningAPI = require('../modules/dining-api.js');
const Constants = require('../utils/Constants.js');

const moment = require('moment-timezone');

async function testDining() {
    await diningAPI.getDiningData().then(function (value) {

        let chickfila = value.dining[0];
        console.log(chickfila);

    }, function (error) {
        console.log(error);
    });
}

async function testFoodtrucks() {
    await diningAPI.getFoodtruckData().then(function (value) {

        let speechText = ''

        let today = moment.now();

        //
        //  Filter out all objects with dates that are not today
        //
        let openToday = value.foodtruck.filter(function (item) {
            let itemDay = moment(item.OpenDate, "YYYY-MM-DD");
            return itemDay.isSame(today, 'day');
        })

        //
        //  Build speech Text
        //

        // TODO: - Handle no open foodtrucks

        speechText = 'The foodtrucks on campus today are ';
        openToday.forEach(function (val, key, arr) {

            if (Object.is(arr.length - 1, key)) {
                speechText += 'and ' + val.FoodTruckID + '.';
            } else {
                speechText += val.FoodTruckID + ', ';
            }
        });

        speechText.replace('&', 'and');

        console.log(speechText);

    }, function (error) {
        console.log(error);
    });
}

async function testOpenNow() {
    await diningAPI.getDiningData().then(function (value) {

        value.dining.forEach(function (location) {
            if (isLocationOpen(location)) {
                console.log(`${location.Name}`);
            }
        });

    }, function (error) {
        console.log(error);
    });
}

function toTimeZone(time, zone) {
    var format = 'YYYY/MM/DD HH:mm:ss ZZ';
    return moment(time, format).tz(zone).format(format);
}


function isLocationOpen(location) {

    let open = false;

    let today = moment.tz('America/Chicago');
    let dow = today.weekday();

    location.Hours.forEach(function (hoursObject) {

        // Check if same day
        if (dow >= hoursObject.Begin_DOW && dow <= hoursObject.End_DOW) {

            let format = 'HH:mm:ss';

            let openingTime = moment.tz(hoursObject.Begin_Time, format, 'America/Chicago');
            let closingTime = moment.tz(hoursObject.End_Time, format, 'America/Chicago');

            // Check if current time is between these times
            if (today.isBetween(openingTime, closingTime)) {
                open = true;
            }
        }
    });

    return open;
}

testOpenNow(); 