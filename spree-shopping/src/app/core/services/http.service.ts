import {
  Injectable
} from '@angular/core';
import {
  RequestOptionsArgs,
  RequestOptions,
  Headers,
  Http,
  RequestMethod,
  URLSearchParams
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as _ from 'lodash';

import {
  environment
} from 'env/environment';
import {
  LocalStorageService
} from 'app/core/services/local-storage.service';
import { Subject } from 'rxjs/Subject';
import { Serializer } from 'app/core/services/serializer';

@Injectable()
export class HttpService {
  public loading$ = new Subject<{loading: boolean, hasError: boolean, hasMsg: string}>();

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService
  ) { }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param params
   */
  get(url, params?: any, headers?: Headers): Observable<any> {
    this.requestInterceptor();

    return this.http.get(
        this.getFullUrl(url), this.requestOptions(params, headers)
      )
      .map( res => {
        const rs = Serializer.deserialize(res.json());
        return rs;
      })
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, ( error: any) => {
        this.onSubscribeError(error);
      });
  }

  /**
  * Performs a request with `post` http method.
  * @param url
  * @param body
  * @param params
  * @returns {Observable<>}
  */
  post(url: string, body: any, headers?: Headers): Observable<any> {
    this.requestInterceptor();

    return this.http.post(
        this.getFullUrl(url),
        body,
        this.requestOptions(null, headers)
      )
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, ( error: any) => {
        this.onSubscribeError(error);
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param params
   * @returns {Observable<>}
   */
  put(url: string, body: any, headers?: Headers): Observable<any> {
    return this.http.put(
        this.getFullUrl(url),
        body,
        this.requestOptions(null, headers)
      )
      .catch(this.onCatch.bind(this));
  }

  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param params
   * @returns {Observable<>}
   */
  delete(url: string, params?: any): Observable<any> {
    return this.http.delete(
        this.getFullUrl(url),
        this.requestOptions(params)
      )
      .catch(this.onCatch.bind(this));
  }

  /**
   * Request options
   * @param options
   * @return RequestOptionsArgs
   */
  private requestOptions(params: any, headers?: Headers): RequestOptionsArgs {
    const options = new RequestOptions();
    const search: URLSearchParams = new URLSearchParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        search.set(key, value);
      }
    }

    options.headers = !headers ? this.defaultHeaders() : headers;
    options.search = search;

    return options;
  }

  /**
   * Set default header
   * @return Headers
   */
  defaultHeaders(): Headers {
    const headers: Headers = new Headers();

    const userApiKey = this.localStorageService.getUserApiKey();

    if (!_.isNull(userApiKey)) {
      headers.append('X-Spree-Token', userApiKey);
    }

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
   * onSubscribeSuccess
   * @param res
   */
  private onSubscribeSuccess(res: Response): void {
    this.loading$.next({
      loading: false, hasError: false, hasMsg: ''
    });
  }

  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(error: any): void {
    console.log('Something Went wrong while subscribing', error);

    this.loading$.next({
      loading: false, hasError: true, hasMsg: 'Something went wrong'
    });
  }

  /**
   *  Handle error when call a request
   * @param error
   * @param caught
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.of(error);
  }

  /**
   * Request interceptor.
   */
  private requestInterceptor(): void {
    this.loading$.next({
      loading: true, hasError: false, hasMsg: ''
    });
  }
}
