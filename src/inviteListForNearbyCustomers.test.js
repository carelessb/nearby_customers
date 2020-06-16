import {
    getAllNearbyCustomersOrderedById,
    getContentForCustomerInvite,
    outputCustomersInRange
} from './inviteListForNearbyCustomers';
import {Point} from '../utils/Point';
import {afterEach, describe, expect, jest, test} from "@jest/globals";

const fs = require('fs');


const officeCoordinates = new Point(53.339428, -6.257664);

describe('outputCustomersInRange', () => {

    const outputFile = process.cwd() + "/output.txt";

    afterEach(() => {
        fs.unlinkSync(outputFile);
    });

    test('top level function', async () => {


        const consoleSpy = jest.spyOn(console, 'log');

        const input = {
            latitude: 52.986375,
            longitude: -6.043701,
            nearbyRadius: 80,
            inputFile: __dirname + "./../test/files/input_goodData.txt",
            outputFile: outputFile
        };
        await outputCustomersInRange(input);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Input values:'));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Office location:'));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invite radius:'));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Input file:'));

    })
});

describe('getAllNearbyCustomersOrderedById', () => {
    test('2 customers, 2 nearby', () => {

        const allCustomers = [
            {
                "user_id": 12,
                "name": "Christina McArdle",
                "latitude": "52.986375",
                "longitude": "-6.043701",
                "coordinates": {
                    "latitude": 52.986375,
                    "longitude": -6.043701
                }
            },
            {
                "user_id": 16,
                "name": "Ian Larkin",
                "latitude": "52.366037",
                "longitude": "-8.179118",
                "coordinates": {
                    "latitude": 52.366037,
                    "longitude": -8.179118
                }
            },
            {
                "user_id": 1,
                "name": "Alice Cahill",
                "latitude": "51.92893",
                "longitude": "-10.27699",
                "coordinates": {
                    "latitude": 51.92893,
                    "longitude": -10.27699
                }
            },
            {
                "user_id": 8,
                "name": "Eoin Ahearn",
                "latitude": "54.0894797",
                "longitude": "-6.18671",
                "coordinates": {
                    "latitude": 54.0894797,
                    "longitude": -6.18671
                }
            }
        ];
        const nearbyRadius = 100;
        const nearbyCustomers = getAllNearbyCustomersOrderedById(allCustomers, officeCoordinates, nearbyRadius);


        expect(nearbyCustomers.length).toEqual(2);

        expect(nearbyCustomers[0].user_id).toEqual(8);
        expect(nearbyCustomers[0].name).toEqual('Eoin Ahearn');
        expect(nearbyCustomers[1].user_id).toEqual(12);
        expect(nearbyCustomers[1].name).toEqual('Christina McArdle');
    });

    test('no customers', () => {

        const allCustomers = [];
        const nearbyRadius = 100;
        const nearbyCustomers = getAllNearbyCustomersOrderedById(allCustomers, officeCoordinates, nearbyRadius);

        const expectedNearbyCustomers = [];

        expect(nearbyCustomers).toEqual(expectedNearbyCustomers);
    });

});

describe('getContentForCustomerInvite', () => {
    test('two customers', () => {

        const customers = [
            {
                "user_id": 12,
                "name": "Christina McArdle",
                "latitude": "52.986375",
                "longitude": "-6.043701",
                "coordinates": {
                    "latitude": 52.986375,
                    "longitude": -6.043701
                }
            },
            {
                "user_id": 1,
                "name": "Alice Cahill",
                "latitude": "51.92893",
                "longitude": "-10.27699",
                "coordinates": {
                    "latitude": 51.92893,
                    "longitude": -10.27699
                }
            }
        ];

        const result = getContentForCustomerInvite(customers);

        const expectedText = '12 - Christina McArdle\r\n1 - Alice Cahill';

        expect(result).toEqual(expectedText);
    });

    test('no customers', () => {

        const customers = [];
        const result = getContentForCustomerInvite(customers);

        const expectedText = '';

        expect(result).toEqual(expectedText);
    });

});