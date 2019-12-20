import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email = false;
  password = false;
  constructor(private router: Router, private auth: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(5)),
    });
  }

  ngOnInit() {
  }


  login(form: FormGroup) {

    if (form.controls.email.status === 'INVALID' || form.value.email === '') {
      this.email = true;
    } else {
      this.email = false;
    }

    if (form.controls.password.status === 'INVALID' || form.value.password === '') {
      this.password = true;
    } else {
      this.password = false;
    }

    if (form.valid) {
      console.log(form.value);
      this.auth.login({ user: form.value }).subscribe((data) => {
        this.router.navigate(['todo']);

        this.auth.setToken(data['user']['token']);

      });

    }

  }

}
