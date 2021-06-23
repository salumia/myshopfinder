import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL: string = "https://myshopfinder.com/api/getFeaturedCategories";
 constructor(private _httpClient:HttpClient) {
    
  }

  getAllCategories():Observable<any>{
    return this._httpClient.get<any>(this.API_URL);
  }
}
