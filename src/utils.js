import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {
  DateFormat,
  HOURS_IN_DAY,
  MILLISECONDS_IN_MINUTES,
  SECONDS_IN_MINUTES
} from './const';

dayjs.extend(minMax);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(number) {
  const randomNumber = Math.floor(Math.random() * (number - 0 + 1) + 0).toFixed(0);
  return Number(randomNumber);
}

function humanizeTaskDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(start) / MILLISECONDS_IN_MINUTES;

  switch (difference) {
    case difference < SECONDS_IN_MINUTES:
      return dayjs(difference).format(DateFormat.MINUTES_WITH_POSTFIX);

    case difference > SECONDS_IN_MINUTES && difference < SECONDS_IN_MINUTES * HOURS_IN_DAY:
      return dayjs(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);

    default:
      return dayjs(difference).format(DateFormat.DAY_HOUR_MINUTES_WITH_POSTFIX);
  }
}

const getDestinationNames = (destinations, points = undefined) => {
  if (points && points.length > 0) {
    return [...new Set(points.map((point) => destinations.find((item) => point.destination === item.id)).map((item) => item.name))];
  }

  return [...new Set(destinations.map((destination) => destination.name))];
};

const getMinData = (items) => humanizeTaskDueDate(dayjs.min(items.map((item) => dayjs(item.dateFrom))), DateFormat.DAY_MONTH);

const getMaxData = (items) => humanizeTaskDueDate(dayjs.max(items.map((item) => dayjs(item.dateTo))), DateFormat.DAY_MONTH);

const capitalize = (item) => item.charAt(0).toUpperCase() + item.substring(1);

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

export {
  getRandomArrayElement,
  getRandomNumber,
  humanizeTaskDueDate,
  getDifferenceInTime,
  getDestinationNames,
  getMinData,
  getMaxData,
  capitalize,
  getFullPrice,
  getElementByType,
  getElementById,
};
