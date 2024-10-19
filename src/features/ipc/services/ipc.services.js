import axios from "axios";

/**
 * @class IPCService
 * @classdesc Provides methods for getting data from the IPC Info API.
 */
class IPCService {
  constructor() {
    this.api = axios.create({});
  }

  /**
   * @method fetchIPCData - Fetches IPC data from the API.
   * @returns {Promise}
   */
  fetchIPCData() {
    return this.api.get("https://api.hungermapdata.org/v1/ipc/peaks");
  }
}

export const ipcService = new IPCService();
