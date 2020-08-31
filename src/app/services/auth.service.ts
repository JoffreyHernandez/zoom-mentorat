import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OAuth } from '../interfaces/oauth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://zoom.us/oauth/';

  constructor(private httpClient: HttpClient) {
    const expiresInDate = localStorage.getItem('expires_in_date');
    if(expiresInDate === null) {
      this.getToken().subscribe((oAuth: OAuth) => this.updateStorageWithOAuth(oAuth));
    } else if(Number(Date.now().toString()) >  Number(expiresInDate)) {
      this.refreshToken().subscribe((oAuth: OAuth) => this.updateStorageWithOAuth(oAuth));
    }
  }

  public askForAuthorization(): void {
    window.location.href = `${this.baseUrl}authorize?response_type=code
      &client_id=${environment.zoom.clientID}
      &redirect_uri=${environment.baseUrl}/redirect`;
  }

  public getToken() {
    const code = localStorage.getItem('code');
    const redirectURL = environment.baseUrl + '/redirect';
    const url = `https://us-central1-zoom-mentorat.cloudfunctions.net/webApi/api/v1/oauth-token`;
    const authorization = btoa(`${environment.zoom.clientID}:${environment.zoom.clientSecret}`);
    return this.httpClient.post(url, { authorization, code, redirectURL });
  }

  public refreshToken(): Observable<OAuth> {
    const refresh_token = localStorage.getItem('refresh_token');
    const authorization = btoa(`${environment.zoom.clientID}:${environment.zoom.clientSecret}`);
    return this.httpClient.post<OAuth>(
      `${this.baseUrl}token?grant_type=refresh_token&refresh_token=${refresh_token}`,
      {},
      {headers: new HttpHeaders().set('Authorization',  `Basic ${authorization}`)}
      );
  }

  public updateStorageWithOAuth(oAuth: OAuth): void {
    localStorage.setItem('access_token', oAuth.access_token);
    localStorage.setItem('expires_in_date', (Date.now() + 3.599e6).toString());
    localStorage.setItem('refresh_token', oAuth.refresh_token);
  }
}
