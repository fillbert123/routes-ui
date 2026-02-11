import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private url = 'https://routes.up.railway.app'

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
}
