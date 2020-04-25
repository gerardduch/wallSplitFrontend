import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Storage } from '@ionic/storage';
import { User } from '../../interfaces/user';
import { AuthenticateResponse, Credentials, UserJwt } from '../../interfaces/authenticate';
import { serverConfiguration, servicesUrlExtension } from 'src/configuration/serverConfiguration';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_SERVER_ADDRESS: string = serverConfiguration.baseUrl;
  private readonly urlServiceExtension: string = servicesUrlExtension.authService;
  private readonly authSubject = new BehaviorSubject(false);

  private currentUserSubject: BehaviorSubject<User>;
  public currentUserAsObservable: Observable<User>;

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private jwtHelper: JwtHelperService,
  ) {
    this.initCurrentUserSubject();
  }

  async initCurrentUserSubject() {
    const currentUser = await this.storage.get('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(currentUser);
    this.currentUserAsObservable = this.currentUserSubject.asObservable();
  }

  get currentUser(): User {
    return this.currentUserSubject.value;
  }

  register(user: User): Observable<AuthenticateResponse> {
    return this.httpClient
      .post<AuthenticateResponse>(
        `${this.AUTH_SERVER_ADDRESS}/${this.urlServiceExtension}/register`,
        user,
      )
      .pipe(
        tap(
          async (res: AuthenticateResponse) => {
            await Promise.all([
              await this.storeToken(res.userJwt),
              await this.storeCurrentUser(res.user),
            ]);
          },
          (err) => throwError(`We couldn't register the user. Error: ${err}`),
        ),
      );
  }

  login(credentials: Credentials): Observable<AuthenticateResponse> {
    return this.httpClient
      .post<AuthenticateResponse>(
        `${this.AUTH_SERVER_ADDRESS}/${this.urlServiceExtension}/login`,
        credentials,
      )
      .pipe(
        tap(async (res: AuthenticateResponse) => {
          await Promise.all([
            await this.storeToken(res.userJwt),
            await this.storeCurrentUser(res.user),
          ]);
        }),
      );
  }

  async logout(): Promise<void> {
    await Promise.all([this.removeToken(), this.removeCurrentUser()]);
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  async getToken(): Promise<string | null> {
    return this.storage.get('accessToken');
  }

  private async storeToken({ accessToken, expiresIn }: UserJwt): Promise<void> {
    await Promise.all([
      this.storage.set('accessToken', accessToken),
      this.storage.set('expiresIn', expiresIn),
    ]);
    this.authSubject.next(true);
  }

  private async storeCurrentUser(user: User): Promise<void> {
    await this.storage.remove('user');
    this.currentUserSubject.next(user);
  }

  private async removeToken(): Promise<void> {
    await Promise.all([this.storage.remove('accessToken'), this.storage.remove('expiresIn')]);
    this.authSubject.next(false);
  }

  private async removeCurrentUser(): Promise<void> {
    await this.storage.remove('currentUser');
    this.authSubject.next(false);
  }
}

export async function tokenGetter(): Promise<string> {
  return await this.storage.get('accessToken');
}
