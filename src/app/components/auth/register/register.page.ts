import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  register(form) {
    const user: User = form.value;
    this.authService.register(user).subscribe(() => this.router.navigateByUrl(''));
  }
}
