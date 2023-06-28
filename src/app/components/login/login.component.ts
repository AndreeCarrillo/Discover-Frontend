import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { loginDto } from 'src/app/models/dto/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup = {} as FormGroup;

  constructor(
    private usuario: UsuarioService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.logInForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  clickButton() {
    let loginDto: loginDto = {
      email: this.logInForm.value.email,
      password: this.logInForm.value.password,
    };

    this.usuario.login(loginDto).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}
