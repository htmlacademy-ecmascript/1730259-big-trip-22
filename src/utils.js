function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(number) {
  const rand = (Math.random() * (number - 0) + 0).toFixed(0);
  return Number(rand);
}

export {getRandomArrayElement, getRandomNumber};
