import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {
  DateFormat,
  HOURS_IN_DAY,
  MILLISECONDS_IN_MINUTES,
  SECONDS_IN_MINUTES
} from '../const';

dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function humanizeDate(date, format) {
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

const getMinData = (items) => humanizeDate(dayjs.min(items.map((item) => dayjs(item.dateFrom))), DateFormat.DAY_MONTH);

const getMaxData = (items) => humanizeDate(dayjs.max(items.map((item) => dayjs(item.dateTo))), DateFormat.DAY_MONTH);

const isPointFuture = (date) => date && dayjs().isAfter(date);

const isPointPast = (date) => date && dayjs().isBefore(date);

const isPointPastAndFuture = (dateFrom, dateTo) => dayjs().isSameOrBefore(dateFrom) && dayjs().isSameOrAfter(dateTo);

export {
  humanizeDate,
  getDifferenceInTime,
  getMinData,
  getMaxData,
  isPointFuture,
  isPointPast,
  isPointPastAndFuture,
};
