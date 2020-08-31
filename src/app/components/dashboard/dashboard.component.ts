import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Meeting } from '../../interfaces/meeting.interface';
import { Meetings } from '../../interfaces/meetings.interface';
import { AuthService } from '../../services/auth.service';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  public form;
  public meetings: Meetings;
  public meeting: Meeting;
  public page = 1;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private meetingsService: MeetingsService) {
    this.buildForm();
    if (!localStorage.getItem('access_token')) {
      this.authService.askForAuthorization();
    } else {
      this.getDefaultMeetings();
    }
  }

  public next(): void {
    this.page++;
    this.meetingsService
      .getAllMeetings(false, this.page)
      .subscribe((meetings: Meetings) => this.meetings = meetings);
  }

  public previous(): void {
    this.page--;
    this.getDefaultMeetings();
  }

  private getDefaultMeetings(): void {
    this.meetingsService.getAllMeetings(false, this.page)
      .subscribe((meetings: Meetings) => this.meetings = meetings);
  }

  private buildForm() {
    this.form = this.fb.group({
        fullName: [
          '',
          Validators.required,
        ],
        email: [
          '',
          [
            Validators.email,
            Validators.required,
          ],
        ],
        date: [
          new Date(),
          Validators.required,
        ],
      },
    );
  }
}
