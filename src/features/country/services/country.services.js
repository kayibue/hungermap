import axios from "axios";

/**
 * @class CountryInfoService
 * @classdesc Provides methods for getting data from the Country Info API.
 */
class CountryInfoService {
  constructor() {
    this.api = axios.create({});
  }

  /**
   *
   * @method fetchCountryData - Fetches country data from the API.
   * @returns {Promise}
   */
  fetchCountryData() {
    return this.api.get("https://api.hungermapdata.org/v2/info/country");
  }
}

export const countryInfoService = new CountryInfoService();
