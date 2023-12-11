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

  getOfferByTipe(type) {
    const allOffers = this.getOffer();
    return allOffers.find((offer) => offer.type === type);
  }

  getOfferById(type, itemsId) {
    const offersType = this.getOfferByTipe(type);

    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  getDestination() {
    return this.destination;
  }

  getDestinationById(id) {
    const allDestination = this.getDestination();
    return allDestination.find((item) => item.id === id);
  }
}
