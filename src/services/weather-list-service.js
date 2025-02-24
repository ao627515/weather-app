export class WeatherListService {
  static #INSTANCE = null;

  weatherListElement = null;

  /**
   * Constructeur de la classe WeatherListService. Le patron Singleton est utilisé ici.
   */
  constructor() {
    if (WeatherListService.#INSTANCE) {
      return WeatherListService.#INSTANCE;
    }
    WeatherListService.#INSTANCE = this;

    this.weatherListElement = document.getElementById('weather-list');
  }

  static getInstance() {
    if (WeatherListService.#INSTANCE === null) {
      WeatherListService.#INSTANCE = new WeatherListService();
    }
    return WeatherListService.#INSTANCE;
  }

}
