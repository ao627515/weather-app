export class LoaderService {
  static #INSTANCE = null;

  /**
   * Constructeur de la classe LoaderService. Le patron Singleton est utilisé ici.
   */
  constructor() {
    if (LoaderService.#INSTANCE) {
      return LoaderService.#INSTANCE;
    }
    LoaderService.#INSTANCE = this;

    this.loaderWrapperElement = document.getElementById('loader-wrapper');
  }


  static getInstance() {
    if (LoaderService.#INSTANCE === null) {
      LoaderService.#INSTANCE = new LoaderService();
    }
    return LoaderService.#INSTANCE;
  }

  show() {
    this.loaderWrapperElement.style.display = 'flex';
  }

  dismiss() {
    this.loaderWrapperElement.style.display = 'none';
  }
}