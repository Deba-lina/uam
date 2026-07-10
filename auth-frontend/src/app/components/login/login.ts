import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginData = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  onLogin() {
    this.errorMessage = '';
    const { email, password } = this.loginData;

    this.authService.logIn(email, password).subscribe({
      next: (response) => {
        const token = response.token;
        console.log(response);
        localStorage.setItem(
          'token',
          token
        );

        this.authService.autoLogout();

        this.router.navigate(
          ['/profile']
        );
      },

      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Login failed. Please try again.';
      },
    });
  }

}