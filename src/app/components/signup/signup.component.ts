import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {
  EMAIL_PATTERN,
  Validators as AppValidators
} from '../../core/forms';
import {UserService} from '../../core/services/user.service';
import {LoginService} from '../../core/services/login.service';

@Component({
  selector: 'bo-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  username: FormControl;
  firstname: FormControl;
  lastname: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;
  errorString: string = undefined;

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
        return this.loginService.login(params.email, params.password);
      })
      .subscribe(() => {
          this.router.navigate(['/']);
        }, (error) => {
          if (error.json()['code'] === 'email_already_taken') {
            this.errorString = 'This email is already taken!';
          } else {
            this.errorString = 'Unable to create account!';
          }
        });
  }

  private initForm() {
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
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    });
  }
}
