import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  API_URL: string = "http://myshopfinder.com/api/getFeaturedProduct";
  constructor(private _httpClient: HttpClient) {

  }

  getFeatureProduct(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL);
  }
}
