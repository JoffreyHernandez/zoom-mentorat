import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OAuth } from '../../interfaces/oauth.interface';
import { ZoomService } from '../../services/zoom.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent  {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private zoomService: ZoomService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['code'] !== undefined) {
        const code = params['code'];
        localStorage.setItem('code', code);
        this.getToken();
      }
    });
  }

  private getToken(): void {
    this.zoomService.getToken().subscribe((oauth: OAuth) => {
      this.updateStorageWithOAuth(oauth);
      this.router.navigate(['/']).then();
    });
  }

  private updateStorageWithOAuth(oAuth: OAuth): void {
    localStorage.setItem('access_token', oAuth.access_token);
    localStorage.setItem('date', new Date().toDateString());
    localStorage.setItem('expires_in', oAuth.expires_in.toString());
    localStorage.setItem('refresh_token', oAuth.refresh_token);
    localStorage.setItem('scope', oAuth.scope);
    localStorage.setItem('token_type', oAuth.token_type);
  }
}
