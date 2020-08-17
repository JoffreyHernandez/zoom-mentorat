import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(private httpClient: HttpClient) { }

  public getToken() {
    const code = localStorage.getItem('code');
    const redirectURL = environment.baseUrl + '/redirect';
    const url = `https://us-central1-zoom-mentorat.cloudfunctions.net/webApi/api/v1/oauth-token`;
    const authorization = btoa(`${environment.zoom.clientID}:${environment.zoom.clientSecret}`);
    return this.httpClient.post(url, { authorization, code, redirectURL });
  }
}
