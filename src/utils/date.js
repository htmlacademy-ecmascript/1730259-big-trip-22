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
  const difference = dayjs(end).diff(start);

  switch (true) {
    case difference < MILLISECONDS_IN_HOUR:
      return dayjs(difference).format(DateFormat.MINUTES_WITH_POSTFIX);

    case difference > MILLISECONDS_IN_HOUR && difference < MILLISECONDS_IN_DAY:
      return dayjs(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);

    case difference > MILLISECONDS_IN_DAY:
      return dayjs(difference).format(DateFormat.DAY_HOUR_MINUTES_WITH_POSTFIX);
  }
}

const getMinData = (items) => humanizeDate(dayjs.min(items.map((item) => dayjs(item.dateFrom))), DateFormat.DAY_MONTH);

const getMaxData = (items) => humanizeDate(dayjs.max(items.map((item) => dayjs(item.dateTo))), DateFormat.DAY_MONTH);

const isPointFuture = (date) => date && dayjs().isAfter(date);

const isPointPast = (date) => date && dayjs().isBefore(date);

const isPointPastAndFuture = (dateFrom, dateTo) => dayjs().isSameOrBefore(dateFrom) && dayjs().isSameOrAfter(dateTo);

const sortByTime = (a, b) => dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom);

export {
  humanizeDate,
  getDifferenceInTime,
  getMinData,
  getMaxData,
  isPointFuture,
  isPointPast,
  isPointPastAndFuture,
  sortByTime,
};
