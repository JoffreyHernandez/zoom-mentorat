import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OAuth } from '../../interfaces/oauth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent  {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['code'] !== undefined) {
        const code = params['code'];
        localStorage.setItem('code', code);
        this.getToken();
      }
    });
  }

  private getToken(): void {
    this.authService.getToken().subscribe((oauth: OAuth) => {
      this.authService.updateStorageWithOAuth(oauth);
      this.router.navigate(['/']).then();
    });
  }
}
