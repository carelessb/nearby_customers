import minimist from 'minimist';
import {help} from './cli/help';
import {version} from './cli/version';

const CONSTANTS = require('./constants.js');
const {outputCustomersInRange} = require('./inviteListForNearbyCustomers.js');

async function cli(argsArray) {
    const args = minimist(argsArray.slice(2));

    if (args.version || args.v) {
        version();
        return;
    }

    if (args.help || args.h) {
        help();
        return;
    }

    try{

        const input = parseInputVariables(args);
        await outputCustomersInRange(input);
    }
    catch(e) {
        console.error(e.message);
    }

}

function parseInputVariables(args) {

    const input = {
        latitude: CONSTANTS.DEFAULT_OFFICE_LATITUDE,
        longitude: CONSTANTS.DEFAULT_OFFICE_LONGITUDE,
        nearbyRadius: CONSTANTS.DEFAULT_INVITE_RADIUS_KMS,
        inputFile: CONSTANTS.DEFAULT_INPUT_FILE,
        outputFile: CONSTANTS.DEFAULT_OUTPUT_FILE
    };

    parseCoordinateVariables(args, input);
    parseNearbyRadiusVariable(args, input);
    parseInputFileVariable(args, input);
    parseOutputFileVariable(args, input);

    return input;
}

function parseCoordinateVariables(args, input) {
    const latitude =
        args.latitude ||
        args.lat;
    const longitude =
        args.longitude ||
        args.lon;
    if ((latitude && !longitude) || (!latitude && longitude)) {
        throw new Error('You must enter both a latitude and a longitude value')
    }
    else if(latitude && longitude) {
        input.latitude = latitude;
        input.longitude = longitude;
    }

    // console.log(`latitude: ${latitude} longitude ${longitude}`);
}

function parseNearbyRadiusVariable(args, input) {
    const nearbyRadius =
        args.nearbyRadius ||
        args.rad;
    if (nearbyRadius) {
        input.nearbyRadius = nearbyRadius;
    }
}

function parseInputFileVariable(args, input) {
    const inputFile =
        args.inputFile ||
        args.in;
    if (inputFile) {
        input.inputFile = process.cwd() + '/' + inputFile;
    }
}

function parseOutputFileVariable(args, input) {
    const outputFile =
        args.outputFile ||
        args.out;
    if (outputFile) {
        input.outputFile = process.cwd() + '/' + outputFile;
    }
}


module.exports = {
    parseInputVariables: parseInputVariables,
    cli: cli
};
