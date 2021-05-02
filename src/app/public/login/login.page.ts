import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login_form: FormGroup;
  public validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ]
  }

  constructor(
    private authService: AuthenticationService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.login_form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.authService.checkToken();
  }

  login() {
    this.authService.login(
      this.login_form.get('username').value,
      this.login_form.get('password').value
    );
  }

  inputClass(field) {
    if (this.login_form.get(field) !== undefined && this.login_form.get(field).status == 'INVALID') {
      return 'invalid';
    }
  }

}
