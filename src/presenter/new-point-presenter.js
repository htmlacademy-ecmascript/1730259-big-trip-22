import { RenderPosition, remove, render } from '../framework/render';
import EditPointView from '../view/edit-point-view';
import { UserAction, UpdateType, DEFAULT_POINT } from '../const';
import { isEscape } from '../utils/common';

export default class NewPointPresenter {
  #pointListContainer = null;
  #dataChangeHandler = null;
  #destroyHandler = null;
  #pointEditComponent = null;
  #pointModel = null;
  #points = [];

  constructor({pointListContainer, pointModel, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#dataChangeHandler = onDataChange;
    this.#destroyHandler = onDestroy;
    this.#pointModel = pointModel;
    this.#points = DEFAULT_POINT;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView({
      point: this.#points,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations,
      onFormSubmit: this.#formSubmitHandler,
      onDeleteClick: this.#deleteClickHandler,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyHandler();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      if (this.#pointEditComponent === null) {
        return;
      }

      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #formSubmitHandler = (point) => {
    this.#dataChangeHandler(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #deleteClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
