export class countrySelectService {
  static #INSTANCE = null;

  constructor() {
    if (countrySelectService.#INSTANCE) {
      return countrySelectService.#INSTANCE;
    }
    countrySelectService.#INSTANCE = this;
  }

  static getInstance() {
    if (countrySelectService.#INSTANCE === null) {
      countrySelectService.#INSTANCE = new countrySelectService();
    }
    return countrySelectService.#INSTANCE;
  }

  getData() {
    return fetch("../src/database/city_coordinates.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error("Erreur de chargement :", error);
        return null; // Retourne `null` en cas d’erreur
      });
  }
}