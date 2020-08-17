import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent   {

  constructor() {
    if (!localStorage.getItem('access_token')) {
      this.askForAuthorization();
    }
  }

  private askForAuthorization(): void {
    const url = `https://zoom.us/oauth/authorize?response_type=code&client_id=${environment.zoom.clientID}&redirect_uri=${environment.baseUrl}/redirect`;
    window.location.href = url;
  }
}
