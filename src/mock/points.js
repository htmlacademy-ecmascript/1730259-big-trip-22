import { POINTS_TYPE } from '../const';
import { getRandomArrayElement, getRandomNumber } from '../utils';

const mockPoints = [
  {
    'id': '1d633166-6a3b-4e7d-9273-34b02554719d',
    'basePrice': getRandomNumber(10000),
    'dateFrom': '2024-01-23T01:15:05.048Z',
    'dateTo': '2024-01-23T22:41:05.048Z',
    'destination': '8d918a87-177b-4333-bcda-670dab018496',
    'isFavorite': !!getRandomNumber(1),
    'offers': [
      '31d88692-7348-48b6-9893-e2dccaa54aa4',
      '79e19e9d-5300-4066-b24d-d1aec1fb0ff3',
      'cedd58ff-fcb5-4a23-b817-c213d2431193',
      '03b1e689-4055-4e29-a441-13cdbc539776',
      '1c05bdff-b89f-418a-a3f2-4c7a153e09c8'
    ],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'id': 'c5aa3f40-f37a-4165-a2be-1d14d921b96c',
    'basePrice': getRandomNumber(10000),
    'dateFrom': '2024-01-26T03:14:05.048Z',
    'dateTo': '2024-01-27T02:38:05.048Z',
    'destination': 'fd9d7a4c-fb5a-4fd5-95e4-d50deb29f50f',
    'isFavorite': !!getRandomNumber(1),
    'offers': [
      '334b810d-4eb2-4534-85fc-f5124d7ed8de',
      '7cec6f24-4a2a-4fdf-a347-5c44947f0320',
      'e566d6ed-8eee-47f2-a14e-2b5eb753b54e'
    ],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'id': 'cd36dec2-a391-47c5-b938-6b7db8f3b4d0',
    'basePrice': getRandomNumber(10000),
    'dateFrom': '2024-01-27T19:49:05.048Z',
    'dateTo': '2024-01-29T04:35:05.048Z',
    'destination': '8d918a87-177b-4333-bcda-670dab018496',
    'isFavorite': !!getRandomNumber(1),
    'offers': [
      'ef578c3e-7235-488a-be62-4949e2daa9dd'
    ],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'id': '7de4a7d9-6b82-4dfc-9457-5b0080e0d212',
    'basePrice': getRandomNumber(10000),
    'dateFrom': '2024-02-01T22:56:05.048Z',
    'dateTo': '2024-02-03T13:29:05.048Z',
    'destination': '8d918a87-177b-4333-bcda-670dab018496',
    'isFavorite': !!getRandomNumber(1),
    'offers': [],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
];

function getRandomPoints() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoints };
