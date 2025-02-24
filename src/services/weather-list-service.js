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

  fillList(data) {
    this.weatherListElement.innerHTML = '';
    if (data && data.length) {
      this.weatherListElement.innerHTML = data.map(item => this.weatherCard(item)).join('');
    }
  }

  weatherCard(item) {
    return `   
      <div class="weather">
        <div class="wrapper">
            <div class="top">
                <h3 class="date">${item.date.toISOString().split('T')[0]}</h3>
                <img src="./assets/images/ishower.png" alt="${item.weather}">
            </div>
            <div class="bottom">
                <p class="weather-description">
                    ${item.weather}
                </p>
                <p class="weather-description">
                    <span class="temp-high">Max: ${item.temp2m.max} °C</span>
                </p>
                <p class="weather-description">
                    <span class="temp-low">Min: ${item.temp2m.min} °C</span>
                </p>
            </div>
        </div>
      </div>
    `;
  }

}
