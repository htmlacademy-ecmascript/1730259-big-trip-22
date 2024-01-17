import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_DAY = 86400000;

const DateFormat = {
  DATE_PICKER: 'd/m/y H:i',
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM DD',
  HOUR_MINUTES: 'HH:mm',
  DAY_MONTH_YEAR: 'DD/MM/YY[&nbsp;]HH:mm',
  MINUTES_WITH_POSTFIX: 'mm[M]',
  HOUR_MINUTES_WITH_POSTFIX: 'HH[H] mm[M]',
  DAY_HOUR_MINUTES_WITH_POSTFIX: 'DD[D] HH[H] mm[M]'
};

const COMMON_CONFIG = {
  dateFormat: DateFormat.DATE_PICKER,
  enableTime: true,
  'time_24hr': true,
  locale: {firstDayOfWeek: 1},
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SystemMessageLoad = {
  LOAD: 'load',
  FAILED_LOAD: 'Failed to load',
};

const SystemMessageList = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  [SystemMessageLoad.LOAD]: 'Loading...',
  [SystemMessageLoad.FAILED_LOAD]: 'Failed to load latest route information',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const POINTS_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_POINT = {
  id: 0,
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

const REG_EXP_SORT = /-(\w+)/;

const UserAction = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_TASK',
  DELETE_POINT: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const ApiMetod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SERVER_URL = 'https://22.objects.pages.academy/big-trip';

const BaseUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const AUTHORIZATION = 'Basic S3ZhemltOmthc2FuZHJh';

export {
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
  DateFormat,
  FilterType,
  SortType,
  POINTS_TYPE,
  DEFAULT_POINT,
  SystemMessageList,
  SystemMessageLoad,
  Mode,
  REG_EXP_SORT,
  COMMON_CONFIG,
  UserAction,
  UpdateType,
  ApiMetod,
  SERVER_URL,
  BaseUrl,
  AUTHORIZATION,
  TimeLimit,
};
