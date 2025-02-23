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

  run() { }

  init() { }

}
