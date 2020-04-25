import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getToken()).pipe(
      switchMap((token: string) => {
        if (!Boolean(token)) {
          return next.handle(request);
        }
        const headers = request.headers
          .set('Authorization', 'Bearer ' + token)
          .append('Content-Type', 'application/json');
        const requestClone = request.clone({ headers });
        return next.handle(requestClone);
      }),
    );
  }
}
