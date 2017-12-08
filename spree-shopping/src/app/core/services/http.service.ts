import { environment } from './../../../environments/environment';
import {
  Injectable
} from '@angular/core';
import {
  RequestOptionsArgs,
  RequestOptions,
  Headers,
  Http,
  RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor( private http: Http) {}

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param params
   */
  get(url, params?: any): Observable<any> {
    return this.http.get(
        this.getFullUrl(url), this.requestOptions(params)
      )
      .catch(this.handleError);
  }

   /**
   * Performs a request with `post` http method.
   * @param url
   * @param body
   * @param params
   * @returns {Observable<>}
   */
  post(url: string, body: any, params: any): Observable<any> {
    return this.http.post(
        this.getFullUrl(url),
        body,
        this.requestOptions(params)
      )
      .catch(this.handleError);
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param params
   * @returns {Observable<>}
   */
  put(url: string, body: any, params: any): Observable<any> {
    return this.http.post(
        this.getFullUrl(url),
        body,
        this.requestOptions(params)
      )
      .catch(this.handleError);
  }

  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param params
   * @returns {Observable<>}
   */
  delete(url: string, params: any): Observable<any> {
    return this.http.delete(
        this.getFullUrl(url),
        this.requestOptions(params)
      )
      .catch(this.handleError);
  }

  /**
   * Request options
   * @param options
   * @return RequestOptionsArgs
   */
  private requestOptions(params: any): RequestOptionsArgs {

    const search: URLSearchParams = new URLSearchParams();

    for ( const key in params ) {
      if ( params.hasOwnProperty(key)) {
        const value = params[key];
        search.append(key, value);
      }
    }
    const options = new RequestOptions();
    options.headers = this.defaultHeaders();
    // options.search = search;

    return options;
  }

  /**
   * Set default header
   * @return Headers
   */
  private defaultHeaders(): Headers {
    const headers: Headers = new Headers();

    headers.append('X-Spree-Token', environment.API_KEY);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return headers;
  }
  /**
   * Build API url
   * @param url
   * @return string
   */
  private getFullUrl(url: string): string {
    return environment.API_ENDPOINT + url;
  }

  /**
   * Handle error when call a request
   * @param error
   */
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
