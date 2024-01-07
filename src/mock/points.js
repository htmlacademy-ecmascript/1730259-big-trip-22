import { POINT_COUNT } from '../const.js';
import { getRandomArrayElement, getRandomNumber } from '../utils/common.js';

const mockPoints = [
  {
    id: '1d633166-6a3b-4e7d-9273-34b02554719d',
    basePrice: getRandomNumber(10000),
    dateFrom: '2021-12-15T13:16:04.351Z',
    dateTo: '2021-12-15T13:48:04.351Z',
    destination: '8d918a87-177b-4333-bcda-670dab018496',
    isFavorite: !!getRandomNumber(1),
    offers: [
      '58f27849-c4f9-42e5-88ab-48267d282369',
      '5df4f3e4-f677-4318-a3f5-458b16f30969',
      'cde29377-f0d4-4626-949a-ab5709a2ad55',
      'effb2e14-3447-497b-a5bb-113083704bbd'
    ],
    type: 'taxi',
  },
  {
    id: 'c5aa3f40-f37a-4165-a2be-1d14d921b96c',
    basePrice: getRandomNumber(10000),
    dateFrom: '2022-12-19T07:29:04.351Z',
    dateTo: '2023-12-19T14:34:04.351Z',
    destination: 'fd9d7a4c-fb5a-4fd5-95e4-d50deb29f50f',
    isFavorite: !!getRandomNumber(1),
    offers: [
      'cafbbdd8-6dea-432f-bb37-f6b8ae635ae4',
      'b371fb66-c631-4bca-b1f8-f80f48692674'
    ],
    type: 'bus',
  },
  {
    id: 'cd36dec2-a391-47c5-b938-6b7db8f3b4d0',
    basePrice: getRandomNumber(10000),
    dateFrom: '2021-12-22T07:25:04.351Z',
    dateTo: '2023-12-22T23:29:04.351Z',
    destination: '57463106-aea1-4e48-9444-62c980b56484',
    isFavorite: !!getRandomNumber(1),
    offers: [
      '055ba681-0802-460d-8b60-9d222286bd59'
    ],
    type: 'ship',
  },
  {
    id: '7de4a7d9-6b82-4dfc-9457-5b0080e0d212',
    basePrice: getRandomNumber(10000),
    dateFrom: '2024-12-26T06:42:04.351Z',
    dateTo: '2024-12-28T16:27:04.351Z',
    destination: '9dede120-f5d3-4e99-99ad-df12a2268571',
    isFavorite: !!getRandomNumber(1),
    offers: [],
    type: 'sightseeing',
  },
];

function getRandomPoints() {
  const pointsRandom = Array.from({length: 0});

  while (pointsRandom.length < POINT_COUNT) {
    const item = getRandomArrayElement(mockPoints);

    if (!pointsRandom.includes(item)) {
      pointsRandom.push(item);
    }
  }

  return pointsRandom;
}

export { getRandomPoints };
