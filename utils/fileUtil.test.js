'use strict'

import {readCustomersFromFile, writeInvitedCustomersToFile} from './fileUtil';
import {afterEach, describe, expect, test} from "@jest/globals";
import {Point} from './Point';

const fs = require('fs');

describe('readCustomersFromFile', () => {
    test('good data, good format', async () => {
        const customers = await readCustomersFromFile(__dirname + './../test/files/input_goodData.txt');

        expect(customers.length).toBe(32);

        expect(customers[0]).toHaveProperty('user_id');
        expect(Number.isInteger(customers[0].user_id)).toBe(true);
        expect(customers[0]).toHaveProperty('name');
        expect(typeof customers[0].name).toBe('string');
        expect(customers[0]).toHaveProperty('latitude');
        expect(typeof customers[0].latitude).toBe('string');
        expect(customers[0]).toHaveProperty('longitude');
        expect(typeof customers[0].longitude).toBe('string');
        expect(customers[0]).toHaveProperty('coordinates');
        expect(customers[0].coordinates).isPrototypeOf(Point);
    });

    test('empty file', async () => {

        const customers = await readCustomersFromFile(__dirname + './../test/files/input_empty.txt');
        expect(Array.isArray(customers)).toBe(true);
        expect(customers.length).toBe(0);
    });

    test('non existent file', async () => {

        const filename = __dirname + './../test/files/input_doesnt_exist.txt';
        const expectedErrorMessage = `The file '${filename}' has not been found`;
        await expect(readCustomersFromFile(filename)).rejects.toThrow(expectedErrorMessage);
    });


    test('wrong format (JSON)', async () => {

        const filename = __dirname + './../test/files/input_json.txt';
        const expectedErrorMessage = 'The input file does not have the right format. Does it contain a JSON array format?';
        await expect(readCustomersFromFile(filename)).rejects.toThrow(expectedErrorMessage);
    });


    test('Invalid line of JSON', async () => {

        const filename = __dirname + './../test/files/input_invalidLineJson.txt';
        await expect(readCustomersFromFile(filename)).rejects.toThrow(/Unexpected string in JSON at position/);
    });

});

describe('writeInvitedCustomersToFile', () => {

    const randomNumber = Math.round(Math.random * 1000);
    const outputFile = __dirname + `/outputFile_${randomNumber}.txt`;

    afterEach(() => {
        fs.unlinkSync(outputFile);
    });

    test('positive test', async () => {

        const fileContent =
            "1 - Alice Cahill\r\n" +
            "2 - Ian McArdle\r\n" +
            "3 - Jack Enright\r\n" +
            "7 - Frank Kehoe";

        writeInvitedCustomersToFile(fileContent, outputFile);

        expect(fs.existsSync(outputFile)).toBe(true);
        expect(fs.readFileSync(outputFile, 'utf-8')).toEqual(fileContent);
    });
});