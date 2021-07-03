import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendContactService {

  API_URL: string = environment.BASE_API_URL + "sendContact";

  constructor(private _httpClient: HttpClient) {
  }

  sendContactDetails(data: any): Observable<any> {
    return this._httpClient.post<any>(this.API_URL, data);
  }
}
