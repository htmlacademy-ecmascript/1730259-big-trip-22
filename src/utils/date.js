import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';
import {
  DateFormat,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
} from '../const';

dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(dayjs(start));

  switch (true) {
    case difference < MILLISECONDS_IN_HOUR:
      return dayjs.duration(difference).format(DateFormat.MINUTES_WITH_POSTFIX);

    case difference >= MILLISECONDS_IN_HOUR && difference < MILLISECONDS_IN_DAY:
      return dayjs.duration(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);

    case difference >= MILLISECONDS_IN_DAY:
      return Math.floor(dayjs.duration(difference).asDays()) < 10 ? `0${Math.floor(dayjs.duration(difference).asDays())}D ${dayjs.duration(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX)}` : `${Math.floor(dayjs.duration(difference).asDays())}D ${dayjs.duration(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX)}`;
  }
}

const getMinData = (items) => humanizeDate(dayjs.min(items.map((item) => dayjs(item.dateFrom))), DateFormat.DAY_MONTH);

const getMaxData = (items) => humanizeDate(dayjs.max(items.map((item) => dayjs(item.dateTo))), DateFormat.DAY_MONTH);

const isPointFuture = (date) => date && dayjs(date).isAfter(dayjs().format());

const isPointPast = (date) => date && dayjs(date).isBefore(dayjs().format());

const isPointPastAndFuture = (dateFrom, dateTo) => dayjs(dateFrom).isSameOrBefore(dayjs().format()) && dayjs(dateTo).isSameOrAfter(dayjs().format());

const sortByTime = (pointFirst, pointSecond) => dayjs(pointFirst.dateFrom).diff(pointFirst.dateTo) - dayjs(pointSecond.dateFrom).diff(pointSecond.dateTo);

const sortByDay = (pointFirst, pointSecond) => dayjs(pointFirst.dateFrom) - dayjs(pointSecond.dateFrom);

export {
  humanizeDate,
  getDifferenceInTime,
  getMinData,
  getMaxData,
  isPointFuture,
  isPointPast,
  isPointPastAndFuture,
  sortByTime,
  sortByDay,
};
