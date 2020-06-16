"use strict";

const {readCustomersFromFile, writeInvitedCustomersToFile} = require('../utils/fileUtil');
const {distanceBetweenPointsInKilometres} = require('./../utils/distanceCalculations');
const {Point} = require('./../utils/Point');

async function outputCustomersInRange(input) {

    const officeCoordinates = new Point(input.latitude, input.longitude);

    const customers = await readCustomersFromFile(input.inputFile);
    const nearbyCustomersOrdered = getAllNearbyCustomersOrderedById(customers, officeCoordinates, input.nearbyRadius);

    const inviteList = getContentForCustomerInvite(nearbyCustomersOrdered);
    writeInvitedCustomersToFile(inviteList, input.outputFile);

    outputReport(nearbyCustomersOrdered, input);
}

function getAllNearbyCustomersOrderedById(customers, officeCoordinates, nearbyRadius) {
    const nearbyCustomers = getAllNearbyCustomers(customers, officeCoordinates, nearbyRadius);
    nearbyCustomers.sort(sortByCustomerIdAscending);
    return nearbyCustomers;
}

function getAllNearbyCustomers(customers, officeCoordinates, nearbyRadius) {
    const customersInRange = [];

    for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        const distanceToCustomer = distanceBetweenPointsInKilometres(officeCoordinates, customer.coordinates);
        //console.log(`Distance to ${customer.name} is ${distanceToCustomer} kms`);
        if(nearbyRadius >= distanceToCustomer) {
            customersInRange.push(customer);
        }
    }

    return customersInRange;
}

function sortByCustomerIdAscending(a, b) {
    return a.user_id - b.user_id;
}

function getContentForCustomerInvite(nearbyCustomers) {
    let inviteList = '';

    for (let i = 0; i < nearbyCustomers.length; i++) {
        const customer = nearbyCustomers[i];
        inviteList += `${customer.user_id} - ${customer.name}\r\n`;
    }
    inviteList = inviteList.replace(/\s*$/, "")

    return inviteList;
}

function outputReport(nearbyCustomersOrdered, input) {
    const report = `\r\n`+
        `The ${nearbyCustomersOrdered.length} invited customer names and user IDs have been saved to:\r\n` +
        `${input.outputFile}\r\n\r\n` +
        `Input values: \r\n` +
        `  Office location: ${input.latitude} ${input.longitude}\r\n` +
        `  Invite radius: ${input.nearbyRadius} kms\r\n` +
        `  Input file: ${input.inputFile}\r\n`
    console.log(report);
}


module.exports = {
    outputCustomersInRange: outputCustomersInRange,
    getContentForCustomerInvite: getContentForCustomerInvite,
    getAllNearbyCustomersOrderedById: getAllNearbyCustomersOrderedById
}