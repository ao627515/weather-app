import { countrySelectService } from "../services/country-select-service.js";

export class CountrySelectComponent {
  countrySelectElement = null;
  countrySelectService = null;
  data = null;

  constructor() {
    this.countrySelectElement = document.querySelector('#select-country select');
    if (!this.countrySelectElement) {
      throw new Error('Country select element not found in DOM');
    }
    this.countrySelectService = countrySelectService.getInstance();
  }

  async init() {
    try {
      this.data = await this.countrySelectService.getData();
      this.fillSelect(this.data);
    } catch (error) {
      console.error("Failed to initialize country select:", error);
      // Consider implementing user-facing error handling here
    }
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
}