import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './shared/services/authentication.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loggedIn = false;
  public appPages = [
    { title: 'Contacts', url: '/contact-folder', icon: 'book' },
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private authenticationService: AuthenticationService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    await this.storage.create();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.loggedIn = true;
          this.router.navigate(['contact-folder']);
        } else {
          this.loggedIn = false;
          this.router.navigate(['login']);
        }
      });
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
