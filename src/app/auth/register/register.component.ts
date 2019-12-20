import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email = false;
  password = false;
  constructor(private router: Router, private auth: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(5)),
    });
  }

  ngOnInit() {
  }


  register(form: FormGroup) {

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
      this.auth.register({ user: form.value }).subscribe((data) => {
        console.log(data);
        this.router.navigate(['login']);


      });

    }

  }

}
