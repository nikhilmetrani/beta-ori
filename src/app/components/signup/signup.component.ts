import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
// import * as toastr from 'toastr';
import {
  EMAIL_PATTERN,
  Validators as AppValidators
} from '../../core/forms';
import {UserService} from '../../core/services/user.service';
import {LoginService} from '../../core/services/login.service';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'bo-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  username: FormControl;
  firstname: FormControl;
  lastname: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;

  constructor(private router: Router,
              private userService: UserService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(params) {
    this.userService.create(params)
      .mergeMap(() => {
        return this.loginService.login(params.username, params.password);
      })
      .subscribe(() => {
        this.router.navigate(['/']);
      }, this.handleError)
    ;
  }

  private initForm() {
    this.username = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
    ]));
    this.firstname = new FormControl('', Validators.compose([
      Validators.minLength(4),
    ]));
    this.lastname = new FormControl('', Validators.compose([
      Validators.minLength(4),
    ]));
    this.email = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]));
    this.password = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
    ]));
    this.passwordConfirmation = new FormControl('', Validators.compose([
      Validators.required,
      AppValidators.match(this.password),
    ]));
    this.myForm = new FormGroup({
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    });
  }

  private handleError(error) {
    switch (error.status) {
      case 500:
        // this.toastr.error('This username or email is already taken.');
        // if (error.json()['code'] === 'email_already_taken') {
        //   this.toastr.error('This email is already taken.');
        // }
    }
  }

}
