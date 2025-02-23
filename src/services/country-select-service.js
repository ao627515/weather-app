export class CountrySelectService {
  static #INSTANCE = null;
  countrySelectElement = null;
  #data = null;

  constructor() {
    if (CountrySelectService.#INSTANCE) {
      return CountrySelectService.#INSTANCE;
    }
    CountrySelectService.#INSTANCE = this;

    this.countrySelectElement = document.querySelector('#select-country select');
  }

  static getInstance() {
    if (CountrySelectService.#INSTANCE === null) {
      CountrySelectService.#INSTANCE = new CountrySelectService();
    }
    return CountrySelectService.#INSTANCE;
  }

  getData() {
    return fetch("../src/database/city_coordinates.json")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const json = response.json();
        this.#data = await json;
        return json;
      })
      .catch(error => {
        console.error("Erreur de chargement :", error);
        return null; // Retourne `null` en cas d’erreur
      });
  }

  fillSelect(data) {
    const fragment = document.createDocumentFragment();

    data.forEach((item, index) => {
      const option = document.createElement('option');
      option.value = index; // Consider using a unique ID if available
      option.textContent = `${item.city} (${item.country})`;
      fragment.appendChild(option);
    });

    this.resetSelect();
    this.countrySelectElement.appendChild(fragment);
  }

  resetSelect() {
    this.clearOptions();
    this.countrySelectElement.selectedIndex = -1;
    // Optional: Add a default placeholder option
    this.addPlaceholderOption();
  }

  clearOptions() {
    this.countrySelectElement.innerHTML = '';
  }

  // Optional helper method for adding a placeholder
  addPlaceholderOption(text = 'Select a country...') {
    const placeholder = document.createElement('option');
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = text;
    this.countrySelectElement.appendChild(placeholder);
  }
  selectCity() {

    this.countrySelectElement.addEventListener('change', (e) => {  // Utilisation d'une fonction fléchée
      console.log('Sélection modifiée !', e.target.value);
      const index = e.target.value;
      this.fetchCitySelected(index);  // Ici `this` fait référence à l'instance de la classe
    });
  }

  fetchCitySelected(index) {
    // console.log(index);
    // console.log(this.#data);


    if (index >= 0) {
      // console.log(this.#data);
      const item = this.#data[+index];
      this.citySelected = item;
      return item;
    }
    throw new Error('incorrect index');
  }

}