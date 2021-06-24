import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL: string =  environment.BASE_API_URL + "getFeaturedCategories";
  
 constructor(private _httpClient:HttpClient) {
    
  }

  getAllCategories():Observable<any>{
    return this._httpClient.get<any>(this.API_URL);
  }
}
