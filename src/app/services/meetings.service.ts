import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateMeeting } from '../interfaces/createMeeting.interface';
import { Meetings } from '../interfaces/meetings.interface';
import { PagingMeeting } from '../interfaces/pagingMeeting.interface';
import { getHeaders } from '../utils/headers.interface';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService implements OnInit {

  private baseUrl = 'https://api.zoom.us/v2/users/me/meetings';
  private meetingsSubject = new BehaviorSubject<Meetings>(null);
  private pagingMeeting = {
    nextMeeting: true,
    page: 1,
  };
  private refreshSubject = new BehaviorSubject<PagingMeeting>(this.pagingMeeting);

  public meetings$ = this.meetingsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  public ngOnInit(): void {
    this.refreshSubject.asObservable()
      .subscribe((PagingMeeting: PagingMeeting) =>
        this.getAllMeetings(PagingMeeting).subscribe((meetings: Meetings) =>
          this.meetingsSubject.next(meetings)));
  }

  public createMeeting(meeting: CreateMeeting): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, meeting, { headers: getHeaders() });
  }

  public changeNextMeeting(nextMeeting: boolean): void {
    this.pagingMeeting.nextMeeting = nextMeeting;
    this.nextRefreshSubject();
  }

  public getPage(): number {
    return this.pagingMeeting.page;
  }

  public nextPage(): void {
    this.pagingMeeting.page++;
    this.nextRefreshSubject();
  }

  public previousPage(): void {
    if (this.pagingMeeting.page !== 1) {
      this.pagingMeeting.page--;
      this.nextRefreshSubject();
    }
  }

  private getAllMeetings(pagingMeeting: PagingMeeting): Observable<Meetings> {
    let params = new HttpParams();
    if (pagingMeeting.nextMeeting) {
      params = params.set('type', 'upcoming');
    }
    if (pagingMeeting.page !== null) {
      params = params.set('page_number', pagingMeeting.page.toString());
    }
    return this.httpClient.get<Meetings>(this.baseUrl, { params, headers: getHeaders() });
  }

  private nextRefreshSubject(): void {
    this.refreshSubject.next(this.pagingMeeting);
  }
}
