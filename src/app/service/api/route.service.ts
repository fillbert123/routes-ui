import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private url = 'https://routes.up.railway.app'
  // private url = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient) { }

  getAllRoutesByLine(): Observable<any> {
    return this.http.get(this.url + '/getAllRoutesByLine');
  }

  getRouteStation(id: number): Observable<any> {
    return this.http.get(this.url + '/getRouteStation/' + id);
  }

  getRouteDetail(id: number): Observable<any> {
    return this.http.get(this.url + '/getRouteDetail/' + id);
  }

  getRouteByRouteGroupId(id: number): Observable<any> {
    return this.http.get(this.url + '/getRouteByRouteGroupId/' + id);
  }

  getSearchStationResult(query: string): Observable<any> {
    return this.http.get(this.url + '/getSearchStationResult/' + query);
  }

  getAllLine(): Observable<any> {
    return this.http.get(this.url + '/getAllLine');
  }

  getRouteGroupById(id: number): Observable<any> {
    return this.http.get(this.url + '/getRouteGroup/' + id);
  }

  getRouteById(id: number): Observable<any> {
    return this.http.get(this.url + '/getRoute/' + id);
  }

  getStationById(id: number): Observable<any> {
    return this.http.get(this.url + '/getStation/' + id);
  }

  getSearchResult(query: string): Observable<any> {
    return this.http.get(this.url + '/getSearchResult/' + query);
  }

  getDirectionResult(originId: number, destinationId: number): Observable<any> {
    return this.http.get(`${this.url}/getDirection?stationStartId=${originId}&stationEndId=${destinationId}`);
  }
}
