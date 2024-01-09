import FilterModel from './model/filter-model.js';
import PointModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointApiService from './point-api-service.js';
import { AUTHORIZATION, SERVER_URL } from './const.js';

const header = document.querySelector('.page-header');
const infoHeader = header.querySelector('.trip-main');
const headerFilterElement = header.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const containerElement = main.querySelector('.trip-events');

const addNewPointBtn = document.querySelector('.trip-main__event-add-btn');

addNewPointBtn.addEventListener('click', handleNewPointButtonClick);

const pointModel = new PointModel({pointApiService: new PointApiService(SERVER_URL, AUTHORIZATION)});
const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter({
  infoContainer: infoHeader,
  pointModel,
});

const filterPresenter = new FilterPresenter({
  filterConteiner: headerFilterElement,
  filterModel,
  pointModel,
});

const boardPresenter = new BoardPresenter({
  boardContainer: containerElement,
  onNewPointDestroy: handleNewTaskFormClose,
  pointModel,
  filterModel,
});

function handleNewTaskFormClose() {
  addNewPointBtn.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  addNewPointBtn.disabled = true;
}

pointModel.init()
  .finally(() => {
    infoPresenter.init();
    filterPresenter.init();
    addNewPointBtn.disabled = false;
  });
boardPresenter.init();
