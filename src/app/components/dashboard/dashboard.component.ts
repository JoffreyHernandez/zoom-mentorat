import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMeeting } from '../../interfaces/createMeeting.interface';
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

  public form: FormGroup;
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

  public onSubmit(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const json: CreateMeeting = {
        topic: `Soutenance ${this.form.value.fullName}`,
        type: 1,
        start_time: this.form.value.date,
        duration: 60,
        schedule_for: null,
        timezone: 'Europe/Paris',
        password: 'Op3ncl4$$',
        agenda: 'description',
        recurrence: null,
        settings: {
          host_video: true,
          participant_video: false,
          cn_meeting: false,
          in_meeting: false,
          join_before_host: false,
          mute_upon_entry: false,
          watermark: false,
          use_pmi: false,
          approval_type: 2,
          registration_type: null,
          audio: 'voip',
          auto_recording: 'local',
          enforce_login: false,
          enforce_login_domains: null,
          alternative_hosts: null,
          global_dial_in_countries: null,
          registrants_email_notification: null,
        },
      };
      this.meetingsService.createMeeting(json)
        .subscribe(s => console.log('s => ' + s));
    }
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
          null,
          Validators.required,
        ],
      },
    );
  }
}
