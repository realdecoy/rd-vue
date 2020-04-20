import { AxiosResponse } from 'axios';
import { Service } from './base';

class __SERVICE__ extends Service {
  // --------------------------------------------------------------------------
  // [Private] Fields
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // [Public] Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  // --------------------------------------------------------------------------
  // [Public] Accessors
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // [Public] Methods
  // --------------------------------------------------------------------------
  public async postData(data): Promise<any> {
    // define custom request options [NB: default config found in @/services/base]
    const options = {};
    return this.api
      .post(`<endpoint-name>`, data, options)
      .then((response: AxiosResponse<any>) => {
        // handle response here
        return response;
      });
  }

  // --------------------------------------------------------------------------
  // [Private] Event Handlers
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // [Private] Methods
  // --------------------------------------------------------------------------

};

// ----------------------------------------------------------------------------
// Module Exports
// ----------------------------------------------------------------------------

const service  = new __SERVICE__();

export {
  service as default,
  service as __SERVICE__
}