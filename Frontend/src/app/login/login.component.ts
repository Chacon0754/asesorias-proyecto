import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.error("Invalido")
      return;
    }
    const email = this.loginForm.get('email')?.value.trim();
    const password = this.loginForm.get('password')?.value.trim();
    console.log(email, password)
    ;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        console.log('Token: ', response.token)

        const payload = JSON.parse(atob(response.token.split('.')[1]));
        const role = payload.role;
        console.log('rol: ', role)
        console.log('getToken(): ',this.authService.getToken());

        if (role === 'admin') {
          console.log('si se logro')
          this.router.navigate(['/admin-home']);
        } else if (role === 'student') {
          this.router.navigate(['/student-home']);
        } else if (role === 'teacher') {
          this.router.navigate(['teacher-home']);
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesion ', error);
      }
    });
  }


}
