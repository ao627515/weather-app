import { countrySelectService } from "../services/country-select-service.js";

export class CountrySelectComponent {
  COUNTRY_SELECT = null;
  countrySelectService = null;
  data = null;
  constructor() {
    this.COUNTRY_SELECT = document.querySelector('#select-country select');
    this.countrySelectService = countrySelectService.getInstance();
    console.log(this.COUNTRY_SELECT);
  }

  init() {
    this.data = this.countrySelectService.getData().then(data => {
      if (data) {
        console.log("Données reçues :", data);
        this.data = data;
      } else {
        console.log("Impossible de charger les données.");
      }
    });
  }
}