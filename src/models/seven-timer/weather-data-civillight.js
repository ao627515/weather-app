export class WeatherDataCivillight {
  constructor(date, weather, temp2m, wind10m_max) {
    this.date = new Date(
      date.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    );
    this.weather = weather;
    this.temp2m = temp2m;
    this.wind10m_max = wind10m_max;
  }
}