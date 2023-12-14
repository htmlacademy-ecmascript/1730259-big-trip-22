import { POINT_COUNT } from '../const';
import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { getRandomPoints } from '../mock/points';

export default class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoints);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
