import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthenticateResponse } from '../../../../interfaces/authenticate';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  ngOnInit() {}

  login(form) {
    this.authService.login(form.value).subscribe(
      ({ user }: AuthenticateResponse) => {
        this.toastService.showSuccessToast({
          message: `Bienvenido de nuevo ${user.firstName}! Nos alegramos mucho de volver a verte :)`,
        });
        this.router.navigateByUrl('home');
      },
      () => {
        this.toastService.showErrorToast({
          message: `Parece que ha habido un error. Vuelve a intentar de conectarte, por favor`,
        });
        throw new Error('Error while login');
      },
    );
  }
}
