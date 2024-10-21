import axios from "axios";

/**
 * @class HazardInfoService
 * @classdesc Provides methods for getting data from the Hazard Info API.
 */
class HazardInfoService {
  constructor() {
    this.api = axios.create({});
  }

  /**
   *
   * @method fetchHazardsData - Fetches hazard data from the API.
   * @returns {Promise}
   */
  fetchHazardsData() {
    return this.api.get("https://api.hungermapdata.org/v1/climate/hazards");
  }
}

export const hazardInfoService = new HazardInfoService();
