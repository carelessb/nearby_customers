import {distanceBetweenPointsInKilometres} from './distanceCalculations';
import {Point} from './Point';
import {describe, expect, test} from "@jest/globals";

describe('distanceBetweenPointsInKilometres', () => {
    test('should calculate the distance between two points', () => {

        const point1 = new Point(52.518611, 13.408056);
        const point2 = new Point(51.519475, 7.46694444);
        const distanceInKilometres = distanceBetweenPointsInKilometres(point1, point2);

        expect(distanceInKilometres).toEqual(421.314);
    });

    test('should calculate distance with negatives', () => {

        const point1 = new Point(37.774514, -122.418079);
        const point2 = new Point(51.519475, 7.46694444);
        const result = distanceBetweenPointsInKilometres(point1, point2);

        expect(result).toEqual(8957.138);
    });

    test('should return 0 if two identical points are given', () => {

        const point1 = new Point(52.518611, 13.408056);
        const point2 = new Point(52.518611, 13.408056);
        const result = distanceBetweenPointsInKilometres(point1, point2);

        expect(result).toEqual(0.000);
    });
});