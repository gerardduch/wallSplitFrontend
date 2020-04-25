import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private authService: AuthService, public router: Router) {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['login']);
  }
}
