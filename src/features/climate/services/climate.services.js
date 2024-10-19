import axios from "axios";

/**
 * @class ClimateService
 * @classdesc Provides methods for getting data from the Country Info API.
 */
class ClimateService {
  constructor() {
    this.api = axios.create({});
  }

  /**
   * @method fetchClimateData - Fetches climate data from the API.
   * @returns {Promise}
   */
  fetchClimateData() {
    return this.api.get("https://api.hungermapdata.org/v2/climate/country");
  }
}

export const climateService = new ClimateService();
