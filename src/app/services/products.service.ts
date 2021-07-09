import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URL: string = environment.BASE_API_URL + "getProducts";
  BREADCRUMB_API_URL: string = environment.BASE_API_URL + "getBreadCrumbs";
  UPDATE_COUNTER_API_URL: string = environment.BASE_API_URL + "updatePopularCounter";
  GET_FILTER_DATA_API_URL: string = environment.BASE_API_URL + "getFilter";

  searchText: string = "";

  constructor(private _httpClient: HttpClient) {

  }

  getAllProducts(offset:number=0,limit:number=environment.LIMIT_RECORD,sort_column:string="id",sort_order:string="asc"): Observable<any> {
    let url = this.API_URL + `?offset=${offset}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}`;
    return this._httpClient.get<any>(url);
  }

  getFilterData(query: string): Observable<any> {    
    if (query == '') {
      return this._httpClient.get<any>(this.GET_FILTER_DATA_API_URL);
    } else {
      return this._httpClient.get<any>(this.GET_FILTER_DATA_API_URL + "?slug=" + query);
    }
  }

  getCategoryProducts(data: any,offset:number=0,limit:number=environment.LIMIT_RECORD,sort_column:string="id",sort_order:string="asc"): Observable<any> {
    let url = this.API_URL + `?offset=${offset}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}`;
    return this._httpClient.post<any>(url, data);
  }

  getFilterCategoryProducts(data: any,query:string,offset:number=0,limit:number=environment.LIMIT_RECORD,sort_column:string="id",sort_order:string="asc"): Observable<any> {
    let url = this.API_URL + `?offset=${offset}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}`;
    return this._httpClient.post<any>(url + "&" + query, data);
  }

  getSearchProducts(query: string,offset:number=0,limit:number=environment.LIMIT_RECORD,sort_column:string="id",sort_order:string="asc"): Observable<any> {
    let url = this.API_URL + `?offset=${offset}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}`;
    return this._httpClient.get<any>(url + "&s=" + query);
  }

  getBreadcrumbs(data: any): Observable<any> {    
    return this._httpClient.post<any>(this.BREADCRUMB_API_URL, data);
  }

  getSearchFilterProducts(query: string,offset:number=0,limit:number=environment.LIMIT_RECORD,sort_column:string="id",sort_order:string="asc"): Observable<any> {
    let url = this.API_URL + `?offset=${offset}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}`;
    return this._httpClient.get<any>(url + "&" + query);
  }

  setSearchText(text: string): void {
    this.searchText = text;
  }

  updateCounterRequest(data: any): Observable<any> {
    return this._httpClient.post<any>(this.UPDATE_COUNTER_API_URL, data);
  }

  getSearchText(): string {
    return this.searchText;
  }
}
