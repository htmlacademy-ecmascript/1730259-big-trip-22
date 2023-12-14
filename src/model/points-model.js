export default class PointModel {
  points = {};
  offers = {};
  destinations = {};

  constructor({ points, offers, destinations }) {
    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

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
