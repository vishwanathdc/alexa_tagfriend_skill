const parkingAPI = require('../modules/parking-api.js');
const Constants = require('../utils/Constants.js');

const lotData = require('../data/parking-lot-info.json');
const buildingData = require('../data/building-info.json');

async function testParking() {
  await parkingAPI.getParkingData().then(function (value) {

    // TODO: - Get the correct values from the intent for garageName and permitName
    let garageName = 'PS1';
    let permitName = 'Green';

    //
    //  Filter out based on the garage
    //
    let filteredGarages = value.parking.filter(function (item) {
      return item.Name == garageName;
    })

    //
    //  Filter out based on the permit
    //
    let filteredPermit = filteredGarages.filter(function (item) {
      return item.ParkingOption == permitName;
    })

    // Total up the spots available on each floor
    let total = 0;
    filteredPermit.forEach(element => {
      total += parseInt(element.Available);
    });

    let speechText = `There are ${total} ${permitName} spots available in ${garageName}`;

    console.log(Constants.SKILL_NAME);
    console.log(speechText);
  }, function (error) {
    console.log(error);
  });
}

function testHandicap() {
  lotData.lots.forEach(function (item) {
    console.log(item.name);
  });
}

function testClosestLot() {

  let speechText = Constants.ERROR_MESSAGE;

  let requestedBuilding = null;
  let closestLot = null;
  let closestDistance = 9999999;

  let requestedBuildingName = 'Parking Structure 4';

  buildingData.buildings.forEach(function (building) {
    if (requestedBuildingName.toUpperCase() == building.name.toUpperCase()) {

      requestedBuilding = building;

      closestLot = lotData.lots[0];
      closestDistance = distance(building.latitude, building.longitude, closestLot.latitude, closestLot.longitude, 'M');

      // Check for the closest lot to this building
      lotData.lots.forEach(function (lot) {
        let currentDistance = distance(building.latitude, building.longitude, lot.latitude, lot.longitude, 'M');
        if (currentDistance < closestDistance) {
          closestDistance = currentDistance;
          closestLot = lot;
        }
      });
    }
  })

  if (requestedBuilding != null && closestLot != null) {
    speechText = `The closest parking lot to ${requestedBuilding.name} is ${closestLot.name}.`;
  }

  console.log(speechText);
}

function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}

testClosestLot(); 