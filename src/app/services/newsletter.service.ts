import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  API_URL: string = environment.BASE_API_URL + "addNewsletter";
  constructor(private _httpClient: HttpClient) { }

  addMailToNewsletter(data: any): Observable<any> {
    return this._httpClient.post<any>(this.API_URL, data);
  }
}
