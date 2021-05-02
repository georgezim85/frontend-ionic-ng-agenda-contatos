import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { StorageService } from '../shared/services/storage.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return from(this.getToken())
      .pipe(
        switchMap(token => {
          const headers = request.headers
            .set('Authorization', 'Bearer ' + token)
            .append('Content-Type', 'application/json');
          const requestClone = request.clone({
            headers
          });
          return next.handle(requestClone);
        })
      );
  }

  getUsername() {
    const username = this.storage.get('username');
    console.log('username', username);
    return username;
  }

  getToken() {
    const authToken = this.storage.get('auth-token');
    return authToken;
  }

}