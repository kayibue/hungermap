import axios from "axios";

/**
 * @class FcsService
 * @classdesc Provides methods for getting data from the FCS API.
 */
class FcsService {
  constructor() {
    this.api = axios.create({});
  }

  /**
   * @method fetchFCSData - Fetches data from the FCS API.
   * @returns {Promise}
   */
  fetchFCSData(is_03_code) {
    return this.api.get(
      `https://api.hungermapdata.org/v1/foodsecurity/country/${is_03_code}`
    );
  }
}

export const fcsService = new FcsService();
