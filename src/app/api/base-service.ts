/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';
import { environment } from '../../environments/environments';
/**
 * Base class for services
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _rootUrl: string = '';
  constructor(
    protected config:ApiConfiguration,
    protected http: HttpClient
  ) {
    this._rootUrl = environment.apiUrl;
  }

 

  /**
   * Returns the root url for all operations in this service. If not set directly in this
   * service, will fallback to `ApiConfiguration.rootUrl`.
   */
  get rootUrl(): string {
    return this._rootUrl || this.config.rootUrl;
  }

  /**
   * Sets the root URL for API operations in this service.
   */
  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }
}
