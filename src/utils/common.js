import { DELAY_TIME } from '../const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(number) {
  const randomNumber = Math.floor(Math.random() * (number - 0 + 1) + 0).toFixed(0);
  return Number(randomNumber);
}

const capitalize = (item) => item.charAt(0).toUpperCase() + item.substring(1);

const getDestinationNames = (destinations, points = undefined) => {
  if (points && points.length > 0) {
    return [...new Set(points.map((point) => destinations.find((item) => point.destination === item.id)).map((item) => item.name))];
  }

  return [...new Set(destinations.map((destination) => destination.name))];
};

const getFullPrice = (points , offers) => {
  const baseFullPrice = points.map((point) => point.basePrice).reduce((accumulator, value) => accumulator + value, 0);
  const offerPoints = points.map((point) => point.offers).flat(Infinity);
  const newOffers = offers.map((offer) => offer.offers).flat().filter((item) => offerPoints.find((offer) => offer === item.id)).map((item) => item.price).reduce((accumulator, value) => accumulator + value, 0);

  return baseFullPrice + newOffers;
};

const getElementByType = (elements, type) => elements.find((element) => element.type === type);

function getElementById(elements, itemsId) {
  if (Array.isArray(itemsId)) {
    return elements.filter((element) => itemsId.find((id) => element.id === id));
  }

  return elements.find((element) => element.id === itemsId);
}

const isEscape = (evt) => evt.key === 'Escape';

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

const showAlert = (element, message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '500px';
  alertContainer.style.right = '50%';
  alertContainer.style.transform = 'translateX(50%)';
  alertContainer.style.top = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff0000';
  alertContainer.style.color = '#000000';
  alertContainer.textContent = message;

  element.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, DELAY_TIME);
};

export {
  getRandomArrayElement,
  getRandomNumber,
  capitalize,
  getFullPrice,
  getElementByType,
  getElementById,
  getDestinationNames,
  isEscape,
  updateItem,
  sortByPrice,
  showAlert,
};
