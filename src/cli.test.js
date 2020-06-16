import {cli, parseInputVariables} from './cli';
import {describe, expect, jest, test} from "@jest/globals";

const fs = require('fs');


describe('cli', () => {

    test('default', async () => {
        const outputFile = process.cwd() + "/output.txt";

        const consoleSpy = jest.spyOn(console, 'log');

        const args = [
            "",
            "",
            "--out=output.txt"
        ];
        await cli(args);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Input values:'));
        fs.unlinkSync(outputFile);
    });

    test('get version', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        const args1 = [
            "",
            "",
            "--v"
        ];

        cli(args1);
        expect(consoleSpy).toHaveBeenCalledWith('1.0.0');

        const args2 = [
            "",
            "",
            "--version"
        ];

        cli(args2);
        expect(consoleSpy).toHaveBeenCalledWith('1.0.0');

    });

    test('get help', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        const args1 = [
            "",
            "",
            "--h"
        ];

        cli(args1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching('inviteList <options>'));

        const args2 = [
            "",
            "",
            "--help"
        ];

        cli(args2);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching('inviteList <options>'));

    });

    test('only 1 coordinate error', async () => {
        const consoleSpy1 = jest.spyOn(console, 'error');
        const expectedErrorMessage = 'You must enter both a latitude and a longitude value';

        const args1 = [
            "",
            "",
            "--latitude"
        ];

        await cli(args1);
        expect(consoleSpy1).toHaveBeenCalledWith(expectedErrorMessage);


        const consoleSpy2 = jest.spyOn(console, 'error');
        const args2 = [
            "",
            "",
            "--longitude"
        ];

        await cli(args2);
        expect(consoleSpy2).toHaveBeenCalledWith(expectedErrorMessage);
    });

});

describe('parseInputVariables', () => {

    test('set CLI variables long-hand', () => {

        const cliArgs = {
            latitude: 53,
            longitude: -9,
            nearbyRadius: 200,
            inputFile: 'customInputFile.txt',
            outputFile: 'customOutputFile.txt'
        };

        const expectedInputVariables = {
            latitude: 53,
            longitude: -9,
            nearbyRadius: 200,
            inputFile: process.cwd() + '/' + 'customInputFile.txt',
            outputFile: process.cwd() + '/' + 'customOutputFile.txt'
        };

        const inputVariables = parseInputVariables(cliArgs);
        expect(inputVariables).toStrictEqual(expectedInputVariables);
    });

    test('set CLI variables short-hand', () => {

        const cliArgs = {
            lat: 53,
            lon: -9,
            rad: 200,
            in: 'customInputFile.txt',
            out: 'customOutputFile.txt'
        };

        const expectedInputVariables = {
            latitude: 53,
            longitude: -9,
            nearbyRadius: 200,
            inputFile: process.cwd() + '/' + 'customInputFile.txt',
            outputFile: process.cwd() + '/' + 'customOutputFile.txt'
        };

        const inputVariables = parseInputVariables(cliArgs);
        expect(inputVariables).toStrictEqual(expectedInputVariables);
    });


    test('only 1 coordinate error', () => {

        const cliArgs1 = {
            latitude: 53
        };
        const expectedErrorMessage = 'You must enter both a latitude and a longitude value';
        const parseOnlyLatitude = () => {parseInputVariables(cliArgs1);};
        expect(parseOnlyLatitude).toThrow(expectedErrorMessage);


        const cliArgs2 = {
            longitude: -9
        };
        const parseOnlyLongitude = () => {parseInputVariables(cliArgs2);};
        expect(parseOnlyLongitude).toThrow(expectedErrorMessage);

    });



});

