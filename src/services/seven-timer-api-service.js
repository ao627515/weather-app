import { WeatherDataCivillight } from "../models/seven-timer/weather-data-civillight.js";

/**
 * Service pour interagir avec l'API SevenTimer.
 */
export class SevenTimerApiService {
  static #INSTANCE = null;
  #domaine = 'http://www.7timer.info/bin/api.pl';

  /**
   * Constructeur de la classe SevenTimerApiService. Le patron Singleton est utilisé ici.
   */
  constructor() {
    if (SevenTimerApiService.#INSTANCE) {
      return SevenTimerApiService.#INSTANCE;
    }
    SevenTimerApiService.#INSTANCE = this;
  }

  /**
   * Retourne l'instance unique de SevenTimerApiService.
   * @returns {SevenTimerApiService} L'instance de SevenTimerApiService.
   */
  static getInstance() {
    if (SevenTimerApiService.#INSTANCE === null) {
      SevenTimerApiService.#INSTANCE = new SevenTimerApiService();
    }
    return SevenTimerApiService.#INSTANCE;
  }

  /**
   * Récupère les données de l'API SevenTimer en fonction des coordonnées géographiques et des paramètres.
   * @param {number} lon - La longitude du lieu.
   * @param {number} lat - La latitude du lieu.
   * @param {string} [product='civillight'] - Le produit de l'API, comme 'astro', 'civil', 'meteo', etc.
   * @param {string} [output='json'] - Le format de la réponse, soit 'json' soit 'xml'.
   * @returns {Promise<WeatherDataCivillight[] | null>} - Les données de l'API au format JSON ou null en cas d'erreur.
   */
  async machineReadableApi(lon, lat, product = 'civillight', output = 'json') {
    try {
      const url = `${this.#domaine}?lon=${lon}&lat=${lat}&product=${product}&output=${output}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();

      if (!json.dataseries || !Array.isArray(json.dataseries)) {
        throw new Error("Format de réponse invalide");
      }

      return json.dataseries.map(item => new WeatherDataCivillight(
        item.date,
        item.weather,
        item.temp2m,
        item.wind10m_max
      ));
    } catch (error) {
      console.error("Erreur de chargement des données :", error);
      return null; // Retourne `null` en cas d'erreur
    }
  }


  /**
   * Récupère les données spécifiques avec des options avancées.
   * @param {number} lon La longitude du lieu.
   * @param {number} lat La latitude du lieu.
   * @param {string} [product='civil'] Le produit de l'API.
   * @param {string} [output='json'] Le format de la réponse.
   * @param {string} [lang='en'] La langue des résultats.
   * @param {string} [unit='metric'] L'unité de mesure. Peut être 'metric' ou 'imperial'.
   * @param {number} [ac=0] La correction d'altitude, applicable uniquement pour 'astro'.
   * @param {number} [tzshift=0] Le décalage horaire.
   * @returns {Promise<Object|null>} Les données de l'API ou null en cas d'erreur.
   */
  machineReadableApiWithOptions(lon, lat, product = 'civil', output = 'json', lang = 'en', unit = 'metric', ac = 0, tzshift = 0) {
    const url = `${this.#domaine}?lon=${lon}&lat=${lat}&product=${product}&output=${output}&lang=${lang}&unit=${unit}&ac=${ac}&tzshift=${tzshift}`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error("Erreur de chargement :", error);
        return null; // Retourne `null` en cas d'erreur
      });
  }
}
