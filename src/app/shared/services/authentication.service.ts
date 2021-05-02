import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShowToastService } from './show-toast-service';
import { StorageService } from './storage.service';

const TOKEN_KEY = 'auth-token';
const USERNAME = 'username';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: StorageService,
    private httpClient: HttpClient,
    private showToastService: ShowToastService,
  ) {
  }

  ngOnInit() {
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
    return this.httpClient.post(
      environment.backend_api_url + '/api/api-token-auth/',
      { username: username, password: password }
    ).subscribe((res: any) => {
      if (res.token) {
        Promise.all([
          this.storage.set(TOKEN_KEY, res.token),
          this.storage.set(USERNAME, username)
        ]).then(() => {
          this.authenticationState.next(true);
        }, (err) => {
          console.log(err);
        })
      }
    }, (err) => {
      this.showToastService.showToast(err.message, 'danger');
      console.log(err);
    });
  }

  logout() {
    return Promise.all([
      this.storage.remove(TOKEN_KEY),
      this.storage.remove(USERNAME)
    ]).then(() => {
      this.authenticationState.next(false);
      window.location.reload();
    }, (err) => {
      this.showToastService.showToast(err.message, 'danger');
      console.log(err);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
