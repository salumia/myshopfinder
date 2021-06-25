import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URL: string =  environment.BASE_API_URL + "getProducts";
  constructor(private _httpClient: HttpClient) {

  }

  getAllProducts(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL);
  }

  getCategoryProducts(data:any): Observable<any> {
    return this._httpClient.post<any>(this.API_URL,data);
  }
}
