import { POINT_COUNT } from '../const';
import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { getRandomPoints } from '../mock/points';

export default class PointModel {
  point = Array.from({length: POINT_COUNT}, getRandomPoints);
  offers = mockOffers;
  destination = mockDestinations;

  getPoint() {
    return this.point;
  }

  getOffer() {
    return this.offers;
  }

  getDestination() {
    return this.destination;
  }
}
