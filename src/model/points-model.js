import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { getRandomPoints } from '../mock/points';

export default class PointModel {
  #points = {};
  #offers = {};
  #destinations = {};

  getPoints() {
    this.#points = getRandomPoints();
    return this.#points;
  }

  getOffers() {
    this.#offers = mockOffers;
    return this.#offers;
  }

  getDestinations() {
    this.#destinations = mockDestinations;
    return this.#destinations;
  }
}
