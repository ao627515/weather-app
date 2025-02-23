import { CountrySelectComponent } from "./components/country-select-component.js";

export class App {

  static #INSTANCE = null;

  constructor() {
    if (App.#INSTANCE) {
      return App.#INSTANCE;
    }
    App.#INSTANCE = this;
  }

  static getInstance() {
    if (App.#INSTANCE === null) {
      App.#INSTANCE = new App();
    }
    return App.#INSTANCE;
  }

  run() {
    const countrySelectComponent = new CountrySelectComponent();
    countrySelectComponent.init();
  }

  init() { }

}
