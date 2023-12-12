import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {
  DATE_FORMAT,
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
      return dayjs(difference).format('mm[M]');

    case difference > SECONDS_IN_MINUTES && difference < SECONDS_IN_MINUTES * HOURS_IN_DAY:
      return dayjs(difference).format('HH[H] mm[M]');
    default:
      return dayjs(difference).format('DD[D] HH[H] mm[M]');
  }
}

export const getDestinationNames = (destinations, points = undefined) => {
  if (points && points.length > 0) {
    return [...new Set(points.map((point) => destinations.find((item) => point.destination === item.id)).map((item) => item.name))];
  }

  return [...new Set(destinations.map((destination) => destination.name))];
};

export const getMinData = (items) => humanizeTaskDueDate(dayjs.min(items.map((item) => dayjs(item.dateFrom))), DATE_FORMAT.monthDay);

export const getMaxData = (items) => humanizeTaskDueDate(dayjs.max(items.map((item) => dayjs(item.dateTo))), DATE_FORMAT.monthDay);

export const capitalize = (item) => item.charAt(0).toUpperCase() + item.substring(1);

export {getRandomArrayElement, getRandomNumber, humanizeTaskDueDate, getDifferenceInTime};
