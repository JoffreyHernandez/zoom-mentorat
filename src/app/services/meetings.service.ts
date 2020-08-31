import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMeeting } from '../interfaces/createMeeting.interface';
import { Meetings } from '../interfaces/meetings.interface';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {

  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
      .set('Access-Control-Allow-Origin', '*');
  }

  public getAllMeetings(onlyUpcoming: boolean = false, page_number: number) {
    const url = 'https://api.zoom.us/v2/users/me/meetings';
    let params = new HttpParams();
    if (onlyUpcoming) {
      params = params.set('type', 'upcoming');
    }
    if (page_number !== null) {
      params = params.set('page_number', page_number.toString());
    }
    return this.httpClient.get<Meetings>(url, { params, headers: this.headers });
  }

  public createMeeting(meeting: CreateMeeting) {
    const url = 'https://api.zoom.us/v2/users/me/meetings';
    return this.httpClient.post<any>(url, meeting,{ headers: this.headers });
  }
}
