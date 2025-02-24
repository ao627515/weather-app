export class SevenTimerIconMapper {

  static #INSTANCE = null;

  constructor() {
    if (SevenTimerIconMapper.#INSTANCE) {
      return SevenTimerIconMapper.#INSTANCE;
    }
    SevenTimerIconMapper.#INSTANCE = this;
  }

  static getInstance() {
    if (SevenTimerIconMapper.#INSTANCE === null) {
      SevenTimerIconMapper.#INSTANCE = new SevenTimerIconMapper();
    }
    return SevenTimerIconMapper.#INSTANCE;
  }
}