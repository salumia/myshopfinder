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

  getFilterData(query: string,search_text:string=""): Observable<any> { 
    var formdata = new FormData();   
    if(query!=""){
      formdata.append("slug",query);
    }
    if(search_text!=""){
      formdata.append("search_text",search_text);
    }
    return this._httpClient.post<any>(this.GET_FILTER_DATA_API_URL,formdata);
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
