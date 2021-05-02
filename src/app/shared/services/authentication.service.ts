import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private httpClient: HttpClient
  ) {
  }

  onNgInit() {
    this.checkToken();
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        this.httpClient.post(
          environment.backend_api_url + '/api/api-token-verify/',
          { token: token }
        ).subscribe((res) => {
          this.authenticationState.next(true);
        }, (err) => {
            this.authenticationState.next(false);
        });
      }
    })
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    return this.httpClient.post(
      environment.backend_api_url + '/api/api-token-auth/',
      { username: username, password: password}
    ).subscribe((res: any) => {
      if (res.token) {
        this.storage.set(TOKEN_KEY, res.token).then(() => {
          this.authenticationState.next(true);
        });
      }
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      window.location.reload();
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
