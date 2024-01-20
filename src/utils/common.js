const capitalize = (item) => item.charAt(0).toUpperCase() + item.substring(1);

const getDestinationNames = (destinations, points = undefined) => {
  if (points && points.length > 0) {
    return [...new Set(points.map((point) => destinations.find((item) => point.destination === item.id)).map((item) => item.name))];
  }

  return [...new Set(destinations.map((destination) => destination.name))];
};

const getFullPrice = (points , offers) => {
  const baseFullPrice = points.map((point) => point.basePrice).reduce((accumulator, value) => accumulator + value, 0);
  const newOffers = offers.map((offer) => offer.offers).flat();
  const offerPointsPrice = points.map((point) => point.offers).flat(Infinity)
    .map((item) => newOffers.find((offer) => offer.id === item))
    .map((item) => item.price).reduce((accumulator, value) => accumulator + value, 0);

  return baseFullPrice + offerPointsPrice;
};

const getElementByType = (elements, type) => elements.find((element) => element.type === type);

function getElementById(elements, itemsId) {
  if (Array.isArray(itemsId)) {
    return elements.filter((element) => itemsId.find((id) => element.id === id));
  }

  return elements.find((element) => element.id === itemsId);
}

const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

export {
  capitalize,
  getFullPrice,
  getElementByType,
  getElementById,
  getDestinationNames,
  isEscape,
  sortByPrice,
};
