import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { throwError } from 'rxjs';

export interface IDataService {
  get<T>(url: string, params: HttpParams | { [key: string]: any | any[]; }): Observable<T>;

  post<T>(url: string, body: any): Observable<T>;

  put<T>(url: string, body: any): Observable<T>;

  delete<T>(url: string, id: string): Observable<T>;
}

//@dynamic
@Injectable()
export class DataService implements IDataService  {
  private path : String = '.';

  // http: any;
  constructor(protected http: HttpClient) {
  }

  /**
   * Fetches one or multiple instances of T
   *
   * @param {string} url
   * @param {string | URLSearchParams} params optional query parameters
   *
   * @return {Promise<T | T[]>}
   */
  public get<T>(url: string, params: HttpParams | { [key: string]: any | any[]; }): Observable<T> {
    return this.http.get<T>(`${this.path}/${url}`, { params: params });
  }

  /**
   * Wrapper for put request to API endpoint
   *
   * @param {string} url
   * @param {any} body
   *
   * @return {Promise<T>}
   */
  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.path}/${url}`, body);
  }

  /**
   * Wrapper for post requests to API endpoint
   *
   * @param {string} url
   * @param {any} body
   *
   * @return {Promise<T>}
   */
  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.path}/${url}`, body);
  }

  /**
   * Wrapper for delete requests to API endpoint
   *
   * @param {string} url
   *
   * @return {Promise<T>}
   */
  public delete<T>(url: string, id: any): Observable<T> {
    return this.http.delete<T>(`${this.path}/${url}/${id}`);
  }
}
