import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMeeting } from '../../interfaces/createMeeting.interface';
import { Meeting } from '../../interfaces/meeting.interface';
import { Meetings } from '../../interfaces/meetings.interface';
import { AuthService } from '../../services/auth.service';
import { MeetingsService } from '../../services/meetings.service';
import { createMeetingBuilder } from '../../utils/createMeetingBuilder.util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public firstSessionForm: FormGroup;
  public newMeetingForm: FormGroup;
  public previousMeetingForm: FormGroup;
  public meetings: Meetings;
  public meeting: Meeting;
  public page = 1;

  private nextMeeting: boolean;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private meetingsService: MeetingsService) {
  }

  public ngOnInit(): void {
    this.buildNewMeetingForm();
    this.buildPreviousMeetingForm();
    if (!localStorage.getItem('access_token')) {
      this.authService.askForAuthorization();
    } else {
      this.getDefaultMeetings();
    }
  }

  public next(): void {
    this.page++;
    this.getDefaultMeetings();
  }

  public onSubmit(): void {
    if (this.newMeetingForm.valid) {
      const { fullName, date } = this.newMeetingForm.value;
      const json: CreateMeeting = createMeetingBuilder(fullName, date);
      this.meetingsService.createMeeting(json)
        .subscribe(s => console.log('s => ' + s));
    }
  }

  public previous(): void {
    this.page--;
    this.getDefaultMeetings();
  }

  private getDefaultMeetings(): void {
    this.meetingsService.getAllMeetings(this.nextMeeting, this.page)
      .subscribe((meetings: Meetings) => this.meetings = meetings);
  }

  private buildPreviousMeetingForm() {
    this.previousMeetingForm = this.fb.group({
      nextMeeting: [
        true,
        Validators.required,
      ],
    });
    this.previousMeetingForm.valueChanges.subscribe(form => {
      this.nextMeeting = form.nextMeeting;
    });
  }

  private buildNewMeetingForm() {
    this.newMeetingForm = this.fb.group({
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
