import PointModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';

const header = document.querySelector('.page-header');
const infoHeader = header.querySelector('.trip-main');
const headerFilterElement = header.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const containerElement = main.querySelector('.trip-events');


const pointModel = new PointModel();
const infoPresenter = new InfoPresenter({
  infoContainer: infoHeader,
  pointModel
});
const filterPresenter = new FilterPresenter({filterConteiner: headerFilterElement});
const boardPresenter = new BoardPresenter({
  boardContainer: containerElement,
  pointModel
});

infoPresenter.init();
filterPresenter.init();
boardPresenter.init();
