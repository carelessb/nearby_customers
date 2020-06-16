"use strict"

const CONSTANTS = require('./../src/constants.js');

class Point {

    constructor(latitude, longitude) {

        this.setLatitude(latitude);
        this.setLongitude(longitude);
    }

    setLatitude(latitude) {
        latitude = this._parseVariable('latitude', latitude);

        if((latitude >= CONSTANTS.MIN_LATITUDE && latitude <= CONSTANTS.MAX_LATITUDE) === false) {
            throw new Error(`The latitude value '${latitude}' is not in the valid range [${CONSTANTS.MIN_LATITUDE}, ${CONSTANTS.MAX_LATITUDE}]`);
        }

        this.latitude = latitude;
    }

    setLongitude(longitude) {

        longitude = this._parseVariable('longitude', longitude);

        if((longitude >= CONSTANTS.MIN_LONGITUDE && longitude <= CONSTANTS.MAX_LONGITUDE) === false) {
            throw new Error(`The longitude value \'${longitude}\' is not in the valid range [${CONSTANTS.MIN_LONGITUDE}, ${CONSTANTS.MAX_LONGITUDE}]`);
        }

        this.longitude = longitude;
    }

    _parseVariable(type, initialValue) {
        let value = initialValue;
        if(typeof value !== 'number') {
            try {
                value = parseFloat(value);
                if(isNaN(value)) {
                    this._throwInvalidError(type, initialValue);
                }
            }
            catch(e) {
                this._throwInvalidError(type, initialValue);
            }
        }
        return value;
    }

    _throwInvalidError(type, value) {
        throw new Error(`The ${type} value '${value}' is not a valid numeric value`);
    }

}



module.exports = {
    Point: Point
}