import { CountrySelectService } from "../services/country-select-service.js";
import { SevenTimerApiService } from "../services/seven-timer-api-service.js";

export class CountrySelectComponent {
  countrySelectElement = null;
  countrySelectService = null;
  sevenTimerApiService = null;
  data = null;
  citySelected = null;

  constructor() {
    this.countrySelectService = CountrySelectService.getInstance();
    this.countrySelectElement = this.countrySelectService.countrySelectElement;
    if (!this.countrySelectElement) {
      throw new Error('Country select element not found in DOM');
    }

    this.sevenTimerApiService = SevenTimerApiService.getInstance();
  }

  async init() {
    try {
      this.data = await this.countrySelectService.getData();
      this.fillSelect(this.data);
    } catch (error) {
      console.error("Failed to initialize country select:", error);
      // Consider implementing user-facing error handling here
    }

    this.event();

  }

  event() {
    this.selectItem();
  }

  fillSelect(data) {
    this.countrySelectService.fillSelect(data);
  }

  resetSelect() {
    this.countrySelectService.resetSelect();
  }

  clearOptions() {
    this.countrySelectService.clearOptions();
  }

  // Optional helper method for adding a placeholder
  addPlaceholderOption(text = 'Select a country...') {
    this.countrySelectService.addPlaceholderOption(text);
  }

  selectItem() {
    this.countrySelectElement.addEventListener('change', (e) => {  // Utilisation d'une fonction fléchée
      console.log('Sélection modifiée !', e.target.value);
      const index = e.target.value;

      const item = this.countrySelectService.fetchCitySelected(+index);
      console.log(item);

      this.fetchWeatherData(item);
    });

  }

  async fetchWeatherData(item) {
    if (item) {
      const response = await this.sevenTimerApiService.machineReadableApi(
        item.longitude,
        item.latitude,
      )
      console.log(response);
    }

    console.log('cest arriver ici');

  }
}