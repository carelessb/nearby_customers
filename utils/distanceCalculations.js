"use strict"

const EARTH_RADIUS_KILOMETRES = 6371;

function distanceBetweenPointsInKilometres(point1, point2) {

    return distanceFormula(point1, point2, EARTH_RADIUS_KILOMETRES);
}

function distanceFormula(point1, point2, radiusOfTheEarth) {

    const latitude1Radians = degrees2radians(point1.latitude);
    const latitude2Radians = degrees2radians(point2.latitude);
    const longitudeDiff = degrees2radians(point1.longitude - point2.longitude);

    const centralAngle =
        Math.acos(
        (Math.sin(latitude1Radians) * Math.sin(latitude2Radians))
           +
           (Math.cos(latitude1Radians) * Math.cos(latitude2Radians) * Math.cos(longitudeDiff))
        );

    const distanceInTheUnitsUsedForTheEarthsRadius = radiusOfTheEarth * centralAngle;

    return threeDecimalPlaces(distanceInTheUnitsUsedForTheEarthsRadius);
}

function degrees2radians(degrees) {
    return degrees * (Math.PI / 180)
}

function threeDecimalPlaces(n) {
    return Math.round(n * 1000) / 1000;
}

module.exports = {
    distanceBetweenPointsInKilometres: distanceBetweenPointsInKilometres
}