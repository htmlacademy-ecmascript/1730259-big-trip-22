import BoardPresenter from './presenter/board-presenter.js';

const header = document.querySelector('.page-header');
const infoHeader = header.querySelector('.trip-main');
const headerFilterElement = header.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const containerElement = main.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: containerElement, infoContainer: infoHeader, filterConteiner: headerFilterElement});

boardPresenter.init();
