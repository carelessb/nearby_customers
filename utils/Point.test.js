"use strict"

import {Point} from './Point'
import {describe, expect, test} from "@jest/globals";


describe('Point', () => {
    test('valid coordinates in string format', () => {

        const officeCoordinates = new Point("53.339428", "-6.257664");

        expect(officeCoordinates.latitude).toEqual(53.339428);
        expect(officeCoordinates.longitude).toEqual(-6.257664);

    });

    test('valid coordinates in number format', () => {

        const officeCoordinates = new Point(53.339428, -6.257664);

        expect(officeCoordinates.latitude).toEqual(53.339428);
        expect(officeCoordinates.longitude).toEqual(-6.257664);

    });

    test('undefined coordinates', () => {

        const createPointUndefinedLat = () => {new Point(undefined, "-6.257664")};
        expect(createPointUndefinedLat).toThrow("The latitude value 'undefined' is not a valid numeric value");

        const createPointUndefinedLong = () => {new Point(90, "undefined")};
        expect(createPointUndefinedLong).toThrow("The longitude value 'undefined' is not a valid numeric value");
    });


    test('out of range latitude in number format', () => {

        const createPoint = () => {new Point(253.339428, -6.257664)};
        expect(createPoint).toThrow("The latitude value '253.339428' is not in the valid range [-90, 90]");

    });

    test('out of range longitude in number format', () => {

        const createPoint = () => {new Point(53.339428, -196.257664)};
        expect(createPoint).toThrow("The longitude value '-196.257664' is not in the valid range [-180, 180]");

    });


    test('out of range latitude in string format', () => {

        const createPoint = () => {new Point("253.339428", "-6.257664")};
        expect(createPoint).toThrow("The latitude value '253.339428' is not in the valid range [-90, 90]");

    });

    test('out of range longitude in string format', () => {

        const createPoint = () => {new Point("53.339428", "-196.257664")};
        expect(createPoint).toThrow("The longitude value '-196.257664' is not in the valid range [-180, 180]");
    });


    test('invalid latitude in string format', () => {

        const createPoint = () => {new Point("abc", "-6.257664")};
        expect(createPoint).toThrow(/The latitude value 'abc' is not a valid numeric value/);


        const createPointEmpty = () => {new Point("", "-6.257664")};
        expect(createPointEmpty).toThrow(/The latitude value '' is not a valid numeric value/);
    });

    test('invalid longitude in string format', () => {

        const createPoint = () => {new Point("53.339428", "abc")};
        expect(createPoint).toThrow(/The longitude value 'abc' is not a valid numeric value/);

        const createPointEmpty = () => {new Point("53.339428", "")};
        expect(createPointEmpty).toThrow(/The longitude value '' is not a valid numeric value/);
    });

});