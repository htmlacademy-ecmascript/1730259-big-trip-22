import { ApiMetod, BaseUrl } from './const.js';
import ApiService from './framework/api-service.js';

export default class PointApiService extends ApiService {
  get points() {
    return this._load({url: BaseUrl.POINTS}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${BaseUrl.POINTS}/${point.id}`,
      method: ApiMetod.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: BaseUrl.POINTS,
      method: ApiMetod.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `${BaseUrl.POINTS}/${point.id}`,
      method: ApiMetod.DELETE,
    });

    return response;
  }

  get offers() {
    return this._load({url: BaseUrl.OFFERS}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: BaseUrl.DESTINATIONS}).then(ApiService.parseResponse);
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    if (point.id === 0) {
      delete adaptedPoint.id;
    }
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
