import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ShowToastService } from '../shared/services/show-toast-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public token = null;
  public username = null;

  constructor(
    private router: Router,
    private storage: Storage,
    private showToastService: ShowToastService
  ) { }

  onNgInit() {
    this.getToken().then((token) => {
      this.token = token;
    });
    this.getUsername().then((username) => {
      this.username = username;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const currentUser = this.getUsername();

    if (this.token && this.username) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
        }
      });
    }

    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 && err.error.non_field_errors) {
            this.showToastService.showToast(err.error.non_field_errors[0], 'danger');
            return;
          }
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['login']);
        }
      }));
  }

  async getUsername() {
    const username = await this.storage.get('username');
    return username;
  }

  async getToken() {
    const authToken = await this.storage.get('auth-token');
    return authToken;
  }

}