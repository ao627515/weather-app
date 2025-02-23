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
   * @param {number} lon La longitude du lieu.
   * @param {number} lat La latitude du lieu.
   * @param {string} [product='civil'] Le produit de l'API, comme 'astro', 'civil', 'meteo', etc.
   * @param {string} [output='json'] Le format de la réponse, soit 'json' soit 'xml'.
   * @returns {Promise<Object|null>} Les données de l'API au format JSON ou null en cas d'erreur.
   */
  machineReadableApi(lon, lat, product = 'civil', output = 'json') {
    const url = `${this.#domaine}?lon=${lon}&lat=${lat}&product=${product}&output=${output}`;
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
